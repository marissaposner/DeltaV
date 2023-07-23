import "reflect-metadata";
import { createServer } from "http";

import app from "./app";
import { syncDbModels } from "./db/connection";
import env from "./utils/env.util";

const start = async (): Promise<void> => {
  try {
    await syncDbModels();
    createServer(app).listen(env.server.port, () =>
      console.info(`Server running on port ${env.server.port}`)
    );
  } catch (error) {
    console.error("_+_+_ Error");
    console.error(error);
    process.exit(1);
  }
};

void start();
