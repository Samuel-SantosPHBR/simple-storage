import { Request, Response } from "express";
import { RegisterUserUseCase } from "../use-cases/user/register/registerUserUseCase";
import { UserRepository } from "../repositories/userRepository";
import { LoginUserUseCase } from "../use-cases/user/login/loginUserUseCase";

class UserController {
  constructor(
    public readonly registerUserUseCase: RegisterUserUseCase,
    public readonly loginUserUseCase: LoginUserUseCase
  ) {}

  public async register(req: Request, res: Response) {
    try {
      await this.registerUserUseCase.execute(req.body);
      res.status(201).send();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const response = await this.loginUserUseCase.execute(req.body);
      res.status(200).send({ token: response });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

export const userController = new UserController(
  new RegisterUserUseCase(new UserRepository()),
  new LoginUserUseCase(new UserRepository())
);
