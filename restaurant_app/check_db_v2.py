
import sqlite3
import json

def check_db():
    try:
        conn = sqlite3.connect('restaurant.db')
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM menu_items;")
        columns = [description[0] for description in cursor.description]
        items = cursor.fetchall()
        
        print(f"Found {len(items)} items.")
        for item in items:
            item_dict = dict(zip(columns, item))
            print(f"ID: {item_dict['id']} | Name: {item_dict['name']} | Category: {item_dict['category']} | Active: {item_dict['is_active']}")
            # Check JSON fields
            for field in ['allergens', 'variants', 'tags']:
                val = item_dict[field]
                try:
                    if val:
                        json.loads(val)
                except Exception as e:
                    print(f"  !!! Invalid JSON in {field}: {val} - {e}")
                    
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_db()
