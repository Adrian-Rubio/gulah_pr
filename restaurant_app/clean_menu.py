
import requests
import time

BASE_URL = "http://192.168.0.221:8000"

def clean_menu():
    print(f"Fetching items from {BASE_URL}/admin/menu ...")
    try:
        response = requests.get(f"{BASE_URL}/admin/menu")
        if response.status_code != 200:
            print(f"Failed to fetch menu: {response.text}")
            return

        items = response.json()
        print(f"Found {len(items)} items. Deleting...")

        for item in items:
            item_id = item['id']
            print(f"Deleting item {item_id}: {item['name']}...")
            del_res = requests.delete(f"{BASE_URL}/admin/menu/{item_id}")
            if del_res.status_code == 200:
                print(f"  Deleted.")
            else:
                print(f"  Failed: {del_res.text}")
            # Small delay to be nice to the server
            # time.sleep(0.1) 
            
        print("Cleanup complete.")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    clean_menu()
