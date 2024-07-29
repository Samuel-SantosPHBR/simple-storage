import md5 from "md5";
import { UserRepository } from "../../../repositories/userRepository";
import { RegisterUserRequestDto } from "./registerUserRequest.dto";
import { getConstants } from "../../../constants";
import { ApplicationError } from "../../../errors/applicationError";

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(payloadDto: RegisterUserRequestDto) {
    try {
      if (this.validatePayloadUser(payloadDto))
        throw new ApplicationError(getConstants().INCORRECT_PAYLOAD);

      const user = await this.userRepository.findByEmail(payloadDto.email);

      if (user) throw new ApplicationError(getConstants().USER_DUPLICATED);

      const dataToInsert = this.parseDataToInsert(payloadDto);

      return this.userRepository.save(dataToInsert);
    } catch (error) {
      if (error instanceof ApplicationError) throw error;

      throw new ApplicationError(getConstants().REGISTER_FAILED);
    }
  }

  private validatePayloadUser(dataDto: RegisterUserRequestDto) {
    return !dataDto.email || !dataDto.name || !dataDto.password;
  }

  private parseDataToInsert(dataDto: RegisterUserRequestDto) {
    return {
      email: dataDto.email,
      name: dataDto.name,
      password: md5(dataDto.password),
    };
  }
}
