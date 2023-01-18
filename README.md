# Auth web

This project is a web authentification where we can login, register or logout a user account. This latter was made with Adonis.js framework.

## Requirements
Node.js and NPM are required to follow the steps.

## Installation
To install Node's packages, do:
```bash
npm install
```

## Create database
To create a database, you have to run the command:
```
node ace configure @adonisjs/lucid
```
Then, select the `sqlite` and the `db.sqlite3` will be automatically created in `tmp` file.

## Configure auth
To configure the authentification, do:
```
node ace configure @adonisjs/auth
```

Then, select the `web` option.
Automatically, the `User` model and the migration with the same name will be created.

## Migration
To migrate the databases, execute the command:
```bash
node ace migration:run
```

The migration allows to create the tables contained in `tmp/db.sqlite3` file.

## Start
To start the server development, do:
```bash
npm run dev
```

And voilà.

## Contributions
Any contributions are welcome ;)
