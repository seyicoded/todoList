import "dotenv/config"

export default ()=>{
    return {
        "development": {
          "username": process.env.DB_USERNAME,
          "password": process.env.DB_PASSWORD,
          "database": process.env.DB_NAME,
          "host": process.env.DB_HOST,
          "port": process.env.DB_PORT,
          "dialect": process.env.DB_DIALECT,
          "logging": false,
          ...(process.env.DB_SSL == 'yes' ? {
            dialectOptions: {
              ssl: {
                require: (process.env.DB_SSL == 'yes') ? true : false,
                rejectUnauthorized: false,
              }
            },
          } : {}),
          "ssl": {
            "require": (process.env.DB_SSL == 'yes') ? true : false,
            rejectUnauthorized: false,
          }
        },
        "test": {
          "username": process.env.DB_USERNAME,
          "password": process.env.DB_PASSWORD,
          "database": process.env.DB_NAME,
          "host": process.env.DB_HOST,
          "port": process.env.DB_PORT,
          "dialect": process.env.DB_DIALECT,
          "logging": false
        },
        "production": {
          "username": process.env.DB_USERNAME,
          "password": process.env.DB_PASSWORD,
          "database": process.env.DB_NAME,
          "host": process.env.DB_HOST,
          "port": process.env.DB_PORT,
          "dialect": process.env.DB_DIALECT,
          "logging": false
        }
      }
      
}