
import requests

BASE_URL = "http://192.168.0.221:8000/menu"

def check_public_menu():
    print(f"Fetching from {BASE_URL} ...")
    try:
        response = requests.get(BASE_URL)
        if response.status_code != 200:
            print(f"Failed to fetch menu: {response.text}")
            return

        items = response.json()
        print(f"Found {len(items)} items in public menu.")
        
        category_counts = {}
        for item in items:
            cat = item.get('category', 'UNKNOWN')
            if cat not in category_counts:
                category_counts[cat] = 0
            category_counts[cat] += 1
            
            # Print sample details for PO BOYS to check case/whitespace
            if "PO BOYS" in cat.upper():
                print(f"DEBUG PO BOY: ID={item['id']} Name='{item['name']}' Cat='{cat}' Active={item['is_active']}")

        print("\nPublic Menu Category Counts:")
        for cat, count in category_counts.items():
            print(f"'{cat}': {count}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_public_menu()
