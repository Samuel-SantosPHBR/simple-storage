import { DataSource } from "typeorm";
import { User } from "../entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "storage",
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [],
});
