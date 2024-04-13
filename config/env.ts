import configJson from './env.json';

interface Config {
  server: {
    port: number | string;
    host: string;
  };
  db: {
    port: number | string;
    host: string;
  };
}

const config: Config = {
  server: {
    port: process.env.PORT ?? configJson.server.port,
    host: process.env.HOST ?? configJson.server.host,
  },
  db: {
    port: process.env.DB_PORT ?? configJson.db.port,
    host: process.env.DB_HOST ?? configJson.db.host,
  },
};

export default config;
