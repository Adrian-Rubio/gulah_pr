from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text

import models
from database import engine
from routers import menu, blog, auth, admin

# Initialize database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Gulah Restaurant API",
    description="Backend API for managing menu items, blog posts, and site configuration.",
    version="1.1.0"
)

# Static files mounting
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.on_event("startup")
async def startup_event():
    """
    Synchronizes PostgreSQL sequences on startup if applicable.
    Ensures primary key increments are correctly aligned with existing data.
    """
    if "postgresql" in str(engine.url):
        try:
            with engine.connect() as conn:
                conn.execute(text("SELECT setval('menu_items_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM menu_items), false)"))
                conn.execute(text("SELECT setval('users_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM users), false)"))
                conn.execute(text("SELECT setval('blog_posts_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM blog_posts), false)"))
                conn.commit()
        except Exception as e:
            print(f"PostgreSQL sequence sync failed: {e}")

# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route registration
app.include_router(auth.router)
app.include_router(menu.router)
app.include_router(blog.router)
app.include_router(admin.router)

@app.get("/")
async def root():
    """
    Root endpoint to verify API health.
    """
    return {"message": "Gulah API is operational"}

@app.get("/health")
async def health():
    """
    Health check endpoint for monitoring.
    """
    return {"status": "ok"}

@app.get("/config")
async def get_public_config():
    """
    Proxy for public configuration (used by the frontend) through the admin router logic.
    """
    from database import SessionLocal
    db = SessionLocal()
    try:
        configs = db.query(models.SiteConfig).all()
        return {c.key: c.value for c in configs}
    finally:
        db.close()
