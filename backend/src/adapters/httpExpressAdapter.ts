import { Request, Response } from "express";

export class HttpExpressAdapter {
  public static execute(callback: any) {
    return (req: Request, res: Response) => {
      callback(req, res);
    };
  }
}
