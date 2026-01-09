import sqlite3
import os

# Connect to the database
db_path = 'restaurant.db'
if not os.path.exists(db_path):
    print(f"Error: {db_path} not found.")
    exit(1)

conn = sqlite3.connect(db_path)

# Open the output file
with open('gulah_export.sql', 'w', encoding='utf-8') as f:
    # iterdump() returns an iterator to dump the database in SQL format
    for line in conn.iterdump():
        f.write('%s\n' % line)

print("Export complete: gulah_export.sql")
conn.close()
