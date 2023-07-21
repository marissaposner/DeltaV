import "dotenv/config";

// Server specific configs
interface IDatabaseConfig {
  // Determine if to use the "url" or the "creds"
  isUrlAccess: boolean;

  // Heroku injects this variable for db
  databaseUrl: string;

  // The credentials for the database
  driver: string;
  database: string;
  host: string;
  password: string;
  port: number;
  username: string;
}

interface IServerConfig {
  apiVersion: string;
  appBaseUrl: string;
  port: string;
}

interface IEnvConfig {
  env: string;
  isDev: boolean;

  server: IServerConfig;
  db: IDatabaseConfig;
}

const isProd = process.env.NODE_ENV === "production";

const configSet: IEnvConfig = {
  env: "development",
  isDev: true,
  db: {
    // Determine if to use the "url" or the "creds"
    isUrlAccess:
      (isProd
        ? process.env.LOCAL_DB_ACCESS_PATH
        : process.env.PROD_DB_ACCESS_PATH) === "url",

    // Heroku injects this variable for db
    databaseUrl: process.env.DATABASE_URL,

    // The credentials for the database
    driver: isProd ? process.env.LOCAL_DB_DRIVER : process.env.PROD_DB_DRIVER,
    database: isProd ? process.env.LOCAL_DB_NAME : process.env.PROD_DB_NAME,
    host: isProd ? process.env.LOCAL_DB_HOST : process.env.PROD_DB_HOST,
    password: isProd
      ? process.env.LOCAL_DB_PASSWORD
      : process.env.PROD_DB_PASSWORD,
    port: isProd
      ? process.env.LOCAL_DB_PORT
      : process.env.PROD_DB_PORT
      ? parseInt(
          isProd ? process.env.LOCAL_DB_PORT : process.env.PROD_DB_PORT,
          10
        )
      : 5432,
    username: isProd
      ? process.env.LOCAL_DB_USERNAME
      : process.env.PROD_DB_USERNAME,
  },
  server: {
    apiVersion: isProd
      ? process.env.LOCAL_SERVER_API_VERSION
      : process.env.PROD_SERVER_API_VERSION,
    appBaseUrl: isProd
      ? process.env.LOCAL_APP_BASE_URL
      : process.env.PROD_APP_BASE_URL,
    port: isProd ? process.env.LOCAL_SERVER_PORT : process.env.PROD_SERVER_PORT,
  },
};

export default configSet;
