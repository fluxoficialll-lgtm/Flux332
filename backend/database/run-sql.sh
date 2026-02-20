#!/bin/bash

# This script runs the SQL files to create the database schema and seed it with data.

# It assumes that the following environment variables are set:
# PGHOST: The database host
# PGPORT: The database port
# PGUSER: The database user
# PGPASSWORD: The database password
# PGDATABASE: The database name

# Run the schema creation script
psql -f backend/database/PostgreSQL/index.sql

# Run the seeding script
psql -f backend/database/seeds/index.sql

echo "Database schema created and seeded successfully."
