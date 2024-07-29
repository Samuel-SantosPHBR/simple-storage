import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";
import cors from "cors";

class Server {
  private app: any;
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(routes);
    this.app.use("/static", express.static("uploads"));
  }

  public run(port = 3000): void {
    this.app.listen(port, () => {});
  }
}

export const server = new Server();
