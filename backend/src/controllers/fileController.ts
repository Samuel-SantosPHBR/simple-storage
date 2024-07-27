import { Request, Response } from "express";

class FileController {
  public upload(req: Request, res: Response) {
    res.send({ text: "upload" });
  }
}

export const fileController = new FileController();
