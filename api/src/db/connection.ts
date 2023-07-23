import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";

import env from "src/utils/env.util";
import modelsListing from "./models/_.model";

const sequelize = env.db.isUrlAccess
  ? new Sequelize(env.db.databaseUrl, {
      dialect: "postgres",
      logging: false,
      models: modelsListing,
      // models: [__dirname + "/models"],
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      define: {
        paranoid: true,
        underscored: true,
      },
    })
  : new Sequelize(
      env.db.database as string,
      env.db.username as string,
      env.db.password,
      {
        host: env.db.host,
        dialect: env.db.driver as Dialect,
        models: modelsListing,
        // models: [__dirname + "/models"],
        port: env.db.port,
        // logging: console.log,
        logging: false,
        define: {
          paranoid: true,
          underscored: true,
        },
      }
    );

export const syncDbModels = async () => {
  await sequelize.sync();
};

export const models = sequelize.models;

export default {
  sequelize: sequelize,
  Sequelize: Sequelize,
};
