import { Request, Response } from "express";
import { RegisterUserUseCase } from "../use-cases/user/register/registerUserUseCase";
import { UserRepository } from "../repositories/userRepository";

class UserController {
  constructor(public readonly registerUserUseCase: RegisterUserUseCase) {}

  public async register(req: Request, res: Response) {
    try {
      await this.registerUserUseCase.execute(req.body);

      return this.login(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Register Failed" });
    }
  }

  public login(req: Request, res: Response) {
    res.send({ text: "login" });
  }
}

export const userController = new UserController(
  new RegisterUserUseCase(new UserRepository())
);
