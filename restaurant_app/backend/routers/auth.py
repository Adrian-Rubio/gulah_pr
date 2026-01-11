from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from passlib.context import CryptContext
import models
import schemas
from database import get_db

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")

def get_password_hash(password):
    """
    Hashes a plain text password.
    """
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    """
    Verifies a plain text password against a hash.
    """
    return pwd_context.verify(plain_password, hashed_password)

@router.post("/login")
def login(request: schemas.LoginRequest, db: Session = Depends(get_db)):
    """
    Authenticates a user and returns their profile.
    
    Args:
        request (LoginRequest): Username and password.
        db (Session): Database session.
        
    Returns:
        dict: User profile data.
    """
    user = db.query(models.User).filter(models.User.username == request.username).first()
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Usuario o contraseña incorrectos")
    
    return {
        "id": user.id,
        "username": user.username,
        "is_admin": user.is_admin,
        "is_superuser": user.is_superuser
    }

@router.get("/users", response_model=List[schemas.User])
def get_users(db: Session = Depends(get_db)):
    """
    Retrieves all registered users.
    
    Args:
        db (Session): Database session.
        
    Returns:
        List[User]: List of users.
    """
    return db.query(models.User).all()

@router.post("/users", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Registers a new user.
    
    Args:
        user (UserCreate): New user data.
        db (Session): Database session.
        
    Returns:
        User: The created user profile.
    """
    existing = db.query(models.User).filter(models.User.username == user.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    
    db_user = models.User(
        username=user.username,
        hashed_password=get_password_hash(user.password),
        is_admin=user.is_admin,
        is_superuser=user.is_superuser
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.put("/users/{user_id}", response_model=schemas.User)
def update_user(user_id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)):
    """
    Updates an existing user's profile or password.
    
    Args:
        user_id (int): ID of the user.
        user (UserUpdate): Data to update.
        db (Session): Database session.
        
    Returns:
        User: The updated user profile.
    """
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    if user.username is not None:
        db_user.username = user.username
    if user.password is not None and user.password.strip() != "":
        db_user.hashed_password = get_password_hash(user.password)
    if user.is_admin is not None:
        db_user.is_admin = user.is_admin
    if user.is_superuser is not None:
        db_user.is_superuser = user.is_superuser
    
    db.commit()
    db.refresh(db_user)
    return db_user

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """
    Removes a user from the system.
    
    Args:
        user_id (int): ID of the user to remove.
        db (Session): Database session.
        
    Returns:
        dict: Success message.
    """
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    db.delete(db_user)
    db.commit()
    return {"message": "Usuario eliminado"}
