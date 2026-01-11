from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
from database import get_db

router = APIRouter(
    prefix="/blog",
    tags=["blog"]
)

@router.get("/", response_model=List[schemas.BlogPost])
def get_blog(db: Session = Depends(get_db)):
    """
    Retrieves all blog posts ordered by creation date (descending).
    
    Args:
        db (Session): Database session.
        
    Returns:
        List[BlogPost]: Array of blog posts.
    """
    return db.query(models.BlogPost).order_by(models.BlogPost.created_at.desc()).all()

@router.get("/{post_id}", response_model=schemas.BlogPost)
def get_blog_post(post_id: int, db: Session = Depends(get_db)):
    """
    Retrieves a single blog post by its ID.
    
    Args:
        post_id (int): ID of the post.
        db (Session): Database session.
        
    Returns:
        BlogPost: The requested blog post.
    """
    post = db.query(models.BlogPost).filter(models.BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.post("/admin", response_model=schemas.BlogPost)
def create_blog_post(post: schemas.BlogPostCreate, db: Session = Depends(get_db)):
    """
    Creates a new blog post.
    
    Args:
        post (BlogPostCreate): Data for the new post.
        db (Session): Database session.
        
    Returns:
        BlogPost: The created blog post.
    """
    db_post = models.BlogPost(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.put("/admin/{post_id}", response_model=schemas.BlogPost)
def update_blog_post(post_id: int, post: schemas.BlogPostUpdate, db: Session = Depends(get_db)):
    """
    Updates an existing blog post.
    
    Args:
        post_id (int): ID of the post to update.
        post (BlogPostUpdate): Updated data.
        db (Session): Database session.
        
    Returns:
        BlogPost: The updated blog post.
    """
    db_post = db.query(models.BlogPost).filter(models.BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    update_data = post.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_post, key, value)
    
    db.commit()
    db.refresh(db_post)
    return db_post

@router.delete("/admin/{post_id}")
def delete_blog_post(post_id: int, db: Session = Depends(get_db)):
    """
    Deletes a blog post from the database.
    
    Args:
        post_id (int): ID of the post to delete.
        db (Session): Database session.
        
    Returns:
        dict: Success message.
    """
    db_post = db.query(models.BlogPost).filter(models.BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(db_post)
    db.commit()
    return {"message": "Post deleted successfully"}
