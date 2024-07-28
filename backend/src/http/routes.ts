import express from "express";
import { HttpExpressAdapter } from "./../adapters";
import { userController, fileController } from "../controllers/";

const routes = express.Router();

//user
routes.post(
  "/user/register",
  HttpExpressAdapter.execute(userController.register.bind(userController))
);
routes.post(
  "/user/login",
  HttpExpressAdapter.execute(userController.login.bind(userController))
);

//files
routes.post("/file/upload", HttpExpressAdapter.execute(fileController.upload));

export default routes;
console.log();
