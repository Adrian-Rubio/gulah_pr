import sqlite3
import os

def check_sqlite():
    db_path = "restaurant.db"
    if not os.path.exists(db_path):
        print(f"Error: {db_path} not found.")
        return

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Check categories
        print("--- DISH CATEGORIES ---")
        cursor.execute("SELECT DISTINCT category FROM menu_items")
        rows = cursor.fetchall()
        for row in rows:
            print(f"'{row[0]}'")

        # Check for Salsas specifically
        print("\n--- SALSAS ITEMS ---")
        cursor.execute("SELECT name, variants, allergens, image_url, category FROM menu_items WHERE category LIKE '%Salsas%' OR category LIKE '%SALSAS%'")
        salsas = cursor.fetchall()
        if not salsas:
            print("No items found for Salsas category.")
        else:
            for s in salsas:
                print(f"Name: {s[0]}")
                print(f"Variants (Raw): {s[1]}")
                print(f"Allergens (Raw): {s[2]}")
                print("-" * 20)

    except Exception as e:
        print(f"Error reading DB: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    check_sqlite()
