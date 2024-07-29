import express from "express";
import { HttpExpressAdapter } from "./../adapters";
import { userController, fileController } from "../controllers/";
import { authMiddleware } from "./middleware/authMiddleware";
import { uploadFileMiddleware } from "./middleware/uploadFileMiddleware";

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
routes.post(
  "/file/upload",
  authMiddleware.execute,
  uploadFileMiddleware.execute(),
  HttpExpressAdapter.execute(fileController.upload.bind(fileController))
);

routes.get(
  "/files",
  authMiddleware.execute,
  HttpExpressAdapter.execute(fileController.list.bind(fileController))
);

export default routes;
