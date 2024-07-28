import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";

class Server {
  private app: any;
  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(routes);
  }

  public run(port = 3000): void {
    this.app.listen(port, () => {});
  }
}

export const server = new Server();
