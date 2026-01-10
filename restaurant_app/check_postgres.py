
import psycopg2
import os

DATABASE_URL = "postgresql://restaurant_user:restaurant_password@localhost:5432/restaurant_db"

def check_postgres():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()
        
        print("--- Connecting to PostgreSQL ---")
        
        # Count items per category
        cursor.execute('SELECT category, COUNT(*) FROM menu_items GROUP BY category')
        counts = cursor.fetchall()
        print("\nCategory Counts:")
        for row in counts:
            print(f"{row[0]}: {row[1]}")
            
        # List some duplicate items to confirm
        print("\nSample Duplicate Check (First 5):")
        cursor.execute("SELECT id, name, category FROM menu_items LIMIT 5")
        for row in cursor.fetchall():
            print(row)
            
        conn.close()
    except Exception as e:
        print(f"Error connecting/querying Postgres: {e}")

if __name__ == "__main__":
    check_postgres()
