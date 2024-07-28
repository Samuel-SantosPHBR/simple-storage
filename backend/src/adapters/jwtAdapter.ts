import jwt from "jsonwebtoken";

export class JwtAdapter {
  public static createJwt(payload: any): string {
    return jwt.sign(payload, "secret");
  }

  public static verifyJwt(payload: string): any {
    return jwt.verify(payload, "secret");
  }
}
