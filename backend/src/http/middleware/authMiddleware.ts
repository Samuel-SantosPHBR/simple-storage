import { Request, Response } from "express";
import { JwtAdapter } from "../../adapters";
import { getConstants } from "../../constants";
import { ApplicationError } from "../../errors/applicationError";

class AuthMiddleware {
  public execute(req: Request, res: Response, next) {
    try {
      const authorization = req.headers.authorization;

      if (!authorization)
        throw new ApplicationError(getConstants().AUTHORIZATION_NOT_FOUND);

      const token = authorization.split(" ")[1];

      if (!token) throw new ApplicationError(getConstants().TOKEN_NOT_FOUND);

      const data = JwtAdapter.verifyJwt(token);

      req.headers.user = data.id;

      next();
    } catch (error) {
      res.send({ message: getConstants().USER_NOT_FOUND });
    }
  }
}

export const authMiddleware = new AuthMiddleware();
