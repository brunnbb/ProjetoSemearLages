from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from datetime import timedelta
import os
from dotenv import load_dotenv

from app.database import get_db, AdminUser
from app.models import LoginRequest, TokenResponse
from app.auth import (
    verify_password,
    create_access_token,
    get_current_user,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from app.limiter import limiter

load_dotenv()

router = APIRouter()
security = HTTPBearer()

@router.post("/login", response_model=TokenResponse)
@limiter.limit("5/minute")
async def login(
    request: Request,
    login_data: LoginRequest,
    response: Response,
    db: Session = Depends(get_db)
):
    """
    Autentica um administrador e retorna um token JWT em cookie httponly
    Rate limit: 5 tentativas por minuto por IP (proteção contra brute force)
    """
    # Validate input
    if not login_data.email or not login_data.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="E-mail e senha são obrigatórios"
        )
    
    # Find user
    user = db.query(AdminUser).filter(AdminUser.email == login_data.email.lower().strip()).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos"
        )
    
    # Verify password
    if not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos"
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )
    
    # Set httponly cookie
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=os.getenv("ENVIRONMENT") == "production",  # HTTPS only in production
        samesite="lax",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        path="/"
    )
    
    return TokenResponse(
        message="Login realizado com sucesso",
        user_email=user.email
    )

@router.post("/logout")
@limiter.limit("30/minute")
async def logout(request: Request, response: Response):
    """
    Remove o token de autenticação
    Rate limit: 30 requisições por minuto
    """
    response.delete_cookie(key="access_token", path="/")
    return {"message": "Logout realizado com sucesso"}

@router.get("/me")
@limiter.limit("60/minute")
async def get_current_user_info(
    request: Request,
    current_user: AdminUser = Depends(get_current_user)
):
    """
    Retorna informações do usuário autenticado
    Rate limit: 60 requisições por minuto
    """
    return {
        "email": current_user.email,
        "id": current_user.id
    }

