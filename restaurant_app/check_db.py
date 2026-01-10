
import sqlite3

def check_db():
    try:
        conn = sqlite3.connect('restaurant.db')
        cursor = conn.cursor()
        
        print("--- Tables ---")
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        for table in tables:
            print(table[0])
            
        print("\n--- Categories in menu_items ---")
        cursor.execute("SELECT DISTINCT category FROM menu_items;")
        categories = cursor.fetchall()
        for cat in categories:
            print(f"'{cat[0]}'")
            
        print("\n--- Sample items ---")
        cursor.execute("SELECT name, category, is_active FROM menu_items LIMIT 10;")
        items = cursor.fetchall()
        for item in items:
            print(item)
            
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_db()
