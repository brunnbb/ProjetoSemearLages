from sqlalchemy import create_engine, Column, Integer, String, Text, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./semear.db")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class News(Base):
    __tablename__ = "news"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    excerpt = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    date = Column(Date, nullable=False)

class Contact(Base):
    __tablename__ = "contacts"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable=False, unique=True)
    phone = Column(String(50), nullable=False)

class AdminUser(Base):
    __tablename__ = "admin_users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable=False, unique=True)
    hashed_password = Column(String(255), nullable=False)

def init_db():
    Base.metadata.create_all(bind=engine)
    
    # Create default admin user if it doesn't exist
    db = SessionLocal()
    try:
        from app.auth import get_password_hash
        
        admin_email = os.getenv("ADMIN_EMAIL", "admin@projetosemear.org.br")
        admin_password = os.getenv("ADMIN_PASSWORD", "admin123")
        
        existing_admin = db.query(AdminUser).filter(AdminUser.email == admin_email).first()
        if not existing_admin:
            hashed_password = get_password_hash(admin_password)
            new_admin = AdminUser(email=admin_email, hashed_password=hashed_password)
            db.add(new_admin)
            db.commit()
    except Exception as e:
        print(f"Error initializing admin user: {e}")
        db.rollback()
    finally:
        db.close()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

