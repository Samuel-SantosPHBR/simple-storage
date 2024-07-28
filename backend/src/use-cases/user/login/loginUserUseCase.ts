import md5 from "md5";
import { UserRepository } from "../../../repositories/userRepository";
import { LoginUserRequestDto } from "./loginUserRequest.dto";
import { User } from "../../../entities";
import { JwtAdapter } from "../../../adapters";
import { getConstants } from "../../../constants";
import { ApplicationError } from "../../../errors/applicationError";

export class LoginUserUseCase {
  constructor(public readonly userRepository: UserRepository) {}

  public async execute(payloadDto: LoginUserRequestDto) {
    try {
      if (this.validatePayloadUser(payloadDto))
        throw new ApplicationError(getConstants().INCORRECT_PAYLOAD);

      const dataToFind = this.parseDataToFind(payloadDto);

      const user = await this.userRepository.findByEmailAndPassword(dataToFind);

      if (!user) throw new ApplicationError(getConstants().USER_NOT_FOUND);

      return this.makeJwtLogin(user);
    } catch (error) {
      if (error instanceof ApplicationError) throw error;

      throw new ApplicationError(getConstants().LOGIN_FAILED);
    }
  }

  private parseDataToFind(dataDto: LoginUserRequestDto): LoginUserRequestDto {
    return {
      email: dataDto.email,
      password: md5(dataDto.password),
    };
  }

  private validatePayloadUser(dataDto: LoginUserRequestDto) {
    return !dataDto.email || !dataDto.password;
  }

  private makeJwtLogin(user: User) {
    return JwtAdapter.createJwt({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
}
