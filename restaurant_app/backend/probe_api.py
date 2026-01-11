import requests
import json

URLS = [
    "http://192.168.0.221:8000",
    "http://localhost:8000",
    "http://127.0.0.1:8000"
]

def check_api():
    base_url = None
    for url in URLS:
        try:
            print(f"Testing {url}...")
            r = requests.get(f"{url}/health", timeout=2)
            if r.status_code == 200:
                print(f"Success connecting to {url}")
                base_url = url
                break
        except Exception as e:
            print(f"Failed {url}: {e}")
    
    if not base_url:
        print("Could not connect to any API.")
        return

    try:
        print(f"Fetching menu from {base_url}/menu...")
        res = requests.get(f"{base_url}/menu")
        items = res.json()
        print(f"Total Items: {len(items)}")
        
        categories = set()
        salsas = []
        
        for item in items:
            cat = (item.get('category') or "VARIOS").strip().upper()
            categories.add(cat)
            if cat == "SALSAS":
                salsas.append(item)
        
        print("\nCategories Found:")
        print(sorted(list(categories)))
        
        print("\nSALSAS Items:")
        for s in salsas:
            print(f"- ID: {s.get('id')} | Name: {s.get('name')}")
            print(f"  Variants: {s.get('variants')} (Type: {type(s.get('variants'))})")
            print(f"  Allergens: {s.get('allergens')} (Type: {type(s.get('allergens'))})")
            print(f"  Image: {s.get('image_url')}")
            
    except Exception as e:
        print(f"Error fetching menu: {e}")

if __name__ == "__main__":
    check_api()
