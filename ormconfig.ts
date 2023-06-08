export = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [],
  synchronize: true,
  migrations: [
    'src/database/migrations/*.ts',
  ],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
}
