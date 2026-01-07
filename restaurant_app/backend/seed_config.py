import sys
import os

# Add the current directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal
import models

def seed_config():
    db = SessionLocal()
    
    # Real data from the image
    contact_data = {
        "address": "Arturo Soria, 198, 28043, Madrid.",
        "phone": "+34 912 345 678", # Placeholder
        "email": "info@gulahpoboys.com",
        "reservation_email": "reservas@gulahpoboys.com",
        "hours": "Lunes a Viernes: 10 am - 24 pm | Sábados y Domingos: 13 pm - 24 pm"
    }

    # Update or Create contact_info
    db_config = db.query(models.SiteConfig).filter(models.SiteConfig.key == "contact_info").first()
    if db_config:
        db_config.value = contact_data
    else:
        db_config = models.SiteConfig(key="contact_info", value=contact_data)
        db.add(db_config)
    
    # Hero Title
    hero_title = "EL PLACER ES NUESTRO"
    db_hero = db.query(models.SiteConfig).filter(models.SiteConfig.key == "welcomeTitle").first()
    if db_hero:
        db_hero.value = hero_title
    else:
        db.add(models.SiteConfig(key="welcomeTitle", value=hero_title))
        
    # Hero Subtitle
    hero_subtitle = "Bienvenido a Gulah, el templo de los auténticos Po'Boys. Aquí cada bocado es una explosión sin filtros."
    db_sub = db.query(models.SiteConfig).filter(models.SiteConfig.key == "welcomeSubtitle").first()
    if db_sub:
        db_sub.value = hero_subtitle
    else:
        db.add(models.SiteConfig(key="welcomeSubtitle", value=hero_subtitle))

    db.commit()
    db.close()
    print("¡Datos del local cargados correctamente en la BBDD!")

if __name__ == "__main__":
    seed_config()
