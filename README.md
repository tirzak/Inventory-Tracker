# Shopify Intern Challenge

## Inventory Tracker
### Supported Functions
1. Create inventory items
2. Edit Them
3. Delete Them
4. View a list of them
5. Assign/remove inventory items to a named group/collection

### Built using
1. React
2. Express.js
3. Postgresql

### Instructions
1. Clone the project and run `npm install` in a terminal to install dependencies inside the project directory
2. Install PostgreSQL. You can find how to install it on this link https://www.postgresql.org/download/
3. The PostgreSQL server should run on port 5432. If that port is unavailable, please change the `DB_PORT` in `.env` file
4. Run the `createTables.sql` file using the command `psql -p 5432  -U yourAdminUser -d postgres -a -f  sql/createTables.sql` or copy and paste the contents of the file in a psql cli. It will create the database,tables and the required user 
    * You need to replace the yourAdminUser in the command with an user in your SQL server that has the capability to create databases. The command `ALTER ROLE me CREATEDB;` can gran a role create database privileges
    * The database specified with -d flag is one of the default databases. If it does not exist in your system, please change it to something that is in your SQL server 
    * Change the port if the server is running on a different port. It is specified with -p flag
5. Running `randomData.sql` will fill the tables with data. This step can be skipped

6. `npm start` should start the app. The default port is 8000. It can be configured in the `.env` file by changing `NODE_PORT`

7. Go to http://localhost:3000 to access the app.

### Frontend Code
1. Since this is a backend challenge, I have converted the frontend to a production build. These prebuilt files are placed under static directory. However, the development code can be found under `client` folder for reference.

### Tests
1. You can run `npm test` to test the app. If everything is working as it should, the tests should pass


    

