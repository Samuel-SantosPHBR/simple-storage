import express from "express";
import { HttpExpressAdapter } from "./../adapters";
import { userController, fileController } from "../controllers/";

const routes = express.Router();

//user
routes.get(
  "/user/register",
  HttpExpressAdapter.execute(userController.register.bind(userController))
);
routes.get(
  "/user/login",
  HttpExpressAdapter.execute(userController.login.bind(userController))
);

//files
routes.get("/file/upload", HttpExpressAdapter.execute(fileController.upload));

export default routes;
console.log();
