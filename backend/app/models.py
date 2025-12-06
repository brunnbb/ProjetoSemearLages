from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import date as date_type
from typing import Optional

class NewsBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255, description="Título da notícia")
    excerpt: str = Field(..., min_length=1, description="Resumo da notícia")
    content: str = Field(..., min_length=1, description="Conteúdo completo da notícia")
    date: date_type = Field(..., description="Data da notícia")

    @field_validator('title', 'excerpt', 'content')
    @classmethod
    def strip_whitespace(cls, v):
        if isinstance(v, str):
            return v.strip()
        return v

    @field_validator('title')
    @classmethod
    def validate_title(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Título não pode estar vazio')
        return v.strip()

    @field_validator('excerpt')
    @classmethod
    def validate_excerpt(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Resumo não pode estar vazio')
        return v.strip()

    @field_validator('content')
    @classmethod
    def validate_content(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Conteúdo não pode estar vazio')
        return v.strip()

class NewsCreate(NewsBase):
    pass

class NewsUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    excerpt: Optional[str] = Field(None, min_length=1)
    content: Optional[str] = Field(None, min_length=1)
    date: Optional[date_type] = None

    @field_validator('title', 'excerpt', 'content', mode='before')
    @classmethod
    def strip_whitespace(cls, v):
        if v is not None and isinstance(v, str):
            return v.strip()
        return v

class NewsResponse(NewsBase):
    id: int
    
    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    email: EmailStr = Field(..., description="E-mail do administrador")
    password: str = Field(..., min_length=1, description="Senha do administrador")

    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('E-mail não pode estar vazio')
        return v.strip().lower()

    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Senha não pode estar vazia')
        return v

class TokenResponse(BaseModel):
    message: str
    user_email: str

