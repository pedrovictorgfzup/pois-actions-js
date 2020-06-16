// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'my_dev_db',
      user:     'postgres',
      password: 'postgres',
      host: 'db',
      port: ''
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'my_staging_db',
      user:     'postgres',
      password: 'postgres',
      host: 'db',
      port: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'my_prod_db',
      user:     'postgres',
      password: 'postgres',
      host: 'db',
      port: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
