module.exports = {
  db: {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USERNAME: process.env.DB_USERNAME || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || null,
    DB_PORT: process.env.DB_PORT || 3306,
    DB_NAME: process.env.DB_NAME || 'database_development',
    DB_DIALECT: process.env.DB_DIALECT || 'mysql',
  }
}
