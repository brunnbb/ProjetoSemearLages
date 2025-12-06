from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List
from datetime import date as date_type

from app.database import get_db, News, AdminUser
from app.models import NewsCreate, NewsUpdate, NewsResponse
from app.auth import get_current_user
from app.limiter import limiter

router = APIRouter()

@router.get("", response_model=List[NewsResponse])
@limiter.limit("100/minute")
async def get_news(
    request: Request,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Lista todas as notícias (público)
    Rate limit: 100 requisições por minuto
    """
    news = db.query(News).order_by(News.date.desc()).offset(skip).limit(limit).all()
    return news

@router.get("/{news_id}", response_model=NewsResponse)
@limiter.limit("100/minute")
async def get_news_item(
    request: Request,
    news_id: int,
    db: Session = Depends(get_db)
):
    """
    Obtém uma notícia específica (público)
    Rate limit: 100 requisições por minuto
    """
    news_item = db.query(News).filter(News.id == news_id).first()
    if not news_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notícia não encontrada"
        )
    return news_item

@router.post("", response_model=NewsResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("20/minute")
async def create_news(
    request: Request,
    news_data: NewsCreate,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_user)
):
    """
    Cria uma nova notícia (requer autenticação)
    Rate limit: 20 requisições por minuto
    """
    # Validação adicional de dados
    if not news_data.title or len(news_data.title.strip()) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Título não pode estar vazio"
        )
    
    if not news_data.excerpt or len(news_data.excerpt.strip()) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Resumo não pode estar vazio"
        )
    
    if not news_data.content or len(news_data.content.strip()) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Conteúdo não pode estar vazio"
        )
    
    # Validação de data
    if news_data.date > date_type.today():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Data da notícia não pode ser no futuro"
        )
    
    # Criar notícia
    db_news = News(
        title=news_data.title.strip(),
        excerpt=news_data.excerpt.strip(),
        content=news_data.content.strip(),
        date=news_data.date
    )
    
    db.add(db_news)
    db.commit()
    db.refresh(db_news)
    
    return db_news

@router.put("/{news_id}", response_model=NewsResponse)
@limiter.limit("30/minute")
async def update_news(
    request: Request,
    news_id: int,
    news_data: NewsUpdate,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_user)
):
    """
    Atualiza uma notícia existente (requer autenticação)
    Rate limit: 30 requisições por minuto
    """
    db_news = db.query(News).filter(News.id == news_id).first()
    if not db_news:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notícia não encontrada"
        )
    
    # Validação de dados atualizados
    update_data = news_data.model_dump(exclude_unset=True)
    
    if "title" in update_data:
        if not update_data["title"] or len(update_data["title"].strip()) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Título não pode estar vazio"
            )
        db_news.title = update_data["title"].strip()
    
    if "excerpt" in update_data:
        if not update_data["excerpt"] or len(update_data["excerpt"].strip()) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Resumo não pode estar vazio"
            )
        db_news.excerpt = update_data["excerpt"].strip()
    
    if "content" in update_data:
        if not update_data["content"] or len(update_data["content"].strip()) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Conteúdo não pode estar vazio"
            )
        db_news.content = update_data["content"].strip()
    
    if "date" in update_data:
        if update_data["date"] > date_type.today():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Data da notícia não pode ser no futuro"
            )
        db_news.date = update_data["date"]
    
    db.commit()
    db.refresh(db_news)
    
    return db_news

@router.delete("/{news_id}", status_code=status.HTTP_204_NO_CONTENT)
@limiter.limit("20/minute")
async def delete_news(
    request: Request,
    news_id: int,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_user)
):
    """
    Remove uma notícia (requer autenticação)
    Rate limit: 20 requisições por minuto
    """
    db_news = db.query(News).filter(News.id == news_id).first()
    if not db_news:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notícia não encontrada"
        )
    
    db.delete(db_news)
    db.commit()
    
    return None

