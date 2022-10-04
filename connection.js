const knex = require('knex')({
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'admin',
      database: 'app_newsletter',
      port: 5432,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });
  
  module.exports = knex;