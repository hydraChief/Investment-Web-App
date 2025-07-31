const migrations=require('mysql-migrations');
const dbConn=require('./db.connection');

function runMigrations() {
  migrations.init(dbConn, __dirname + '/migrations', (err) => {
    if (err) {
      console.error('Error running migrations:', err);
    } else {
      console.log('Migrations completed successfully.');
    }
  });
}

if (require.main === module) {
  runMigrations();
}

module.exports = runMigrations;