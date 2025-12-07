from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
import os
from dotenv import load_dotenv

from app.routers import auth, news
from app.database import init_db
from app.limiter import limiter

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    init_db()
    # Initialize initial data
    from app.init_data import init_data
    init_data()
    yield
    # Shutdown
    pass

app = FastAPI(
    title="Projeto Semear Lages API",
    description="API para gerenciamento do Projeto Semear Lages",
    version="1.0.0",
    lifespan=lifespan
)

# Configurar rate limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler) # type: ignore

# CORS configuration
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
FRONTEND_DOMAIN = os.getenv("FRONTEND_DOMAIN", "http://localhost:5173")

if ENVIRONMENT == "production":
    origins = [
        f"https://{FRONTEND_DOMAIN}",
        f"https://www.{FRONTEND_DOMAIN}",
    ]
else:
    origins = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(news.router, prefix="/api/news", tags=["News"])

@app.get("/")
@limiter.limit("100/minute")
async def root(request: Request):
    return {"message": "Projeto Semear Lages API", "version": "1.0.0"}

@app.get("/api/health")
@limiter.limit("200/minute")
async def health_check(request: Request):
    return {"status": "healthy"}
