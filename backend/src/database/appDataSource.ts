import { DataSource } from "typeorm";
import { User, File } from "../entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "storage",
  synchronize: true,
  logging: false,
  entities: [User, File],
  subscribers: [],
  migrations: [],
});
