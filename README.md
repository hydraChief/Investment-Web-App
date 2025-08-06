This is a Backend project.

## Getting Started

Setup the .env file acording to this:
```bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=investment_db
```

First, run the npm install command:

```bash
npm i
```

Then, run the migration command:

For ending db connection pool after migrations:
```bash
npm run migrate:end
```
OR

For keeping alive the db connection pool after the migrations:
```bash
npm run migrate
```

Then, run server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (after running your frontend server) with your browser to see the result.
