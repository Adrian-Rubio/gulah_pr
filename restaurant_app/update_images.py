import requests

BASE_URL = "http://localhost:8000/admin/menu"

# Known image files from the move operation
image_files = [
    "PHILLY CHEESESTEAK.jpeg", "Wings.jpeg", "alitas bbq px.jpeg", 
    "alitas garlic parmesan.jpeg", "alitas infierno.jpeg", "b.b.brownie.jpeg", 
    "brutus choice.jpeg", "chicken run.jpeg", "chili cheese bites.jpeg", 
    "chulapoh boy.jpeg", "eggs & glory.jpeg", "guaca-lover.jpeg", 
    "higo & roll.jpeg", "huevos rancheros.jpeg", "jazz balls.jpeg", 
    "mac and cheese.jpeg", "mr pinzas.jpeg", "nachos gulah.jpeg", 
    "patatas rancheras.jpeg", "pulled pork.jpeg", "smoky salmon.jpeg", 
    "steak and chick.jpeg", "tarta de queso.jpeg", "the slow burn.jpeg", 
    "toro loco.jpeg", "voodo veggie.jpeg"
]

# Mapping logic
mapping = {}
for filename in image_files:
    name_no_ext = filename.split('.')[0].lower()
    mapping[name_no_ext] = filename

# Special cases
manual_mapping = {
    "wings": "CRISPY WINGS",
    "alitas infierno": "ALITAS DEL INFIERNO",
    "steak and chick": "STEAK & CHIC",
    "voodo veggie": "VODOO VEGGY"
}

try:
    items = requests.get(BASE_URL).json()
except Exception as e:
    print(f"Error fetching items: {e}")
    exit(1)

updated_count = 0
for item in items:
    found_image = None
    item_name_lower = item['name'].lower()
    
    # Check manual mapping first
    for img_key, official_name in manual_mapping.items():
        if official_name.lower() == item_name_lower:
            found_image = mapping.get(img_key)
            break
            
    # Check direct match if not found
    if not found_image:
        if item_name_lower in mapping:
            found_image = mapping[item_name_lower]
            
    if found_image:
        item_id = item['id']
        image_url = f"/images/{found_image}"
        try:
            res = requests.put(f"{BASE_URL}/{item_id}", json={"image_url": image_url})
            if res.status_code == 200:
                print(f"Updated {item['name']} with image {found_image}")
                updated_count += 1
            else:
                print(f"Failed to update {item['name']}: {res.text}")
        except Exception as e:
            print(f"Error updating {item['name']}: {e}")

print(f"Total updated: {updated_count}")
