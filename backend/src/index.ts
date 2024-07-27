import "reflect-metadata";
import { server } from "./http";
import { database } from "./database/database";

database.init();
server.run(3001);
