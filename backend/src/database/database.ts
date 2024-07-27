import { AppDataSource } from "./appDataSource";

class DataBase {
  public init() {
    AppDataSource.initialize().catch((error) => console.log(error));
  }
}

export const database = new DataBase();
