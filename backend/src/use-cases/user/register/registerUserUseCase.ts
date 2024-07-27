import { UserRepository } from "../../../repositories/userRepository";
import { RegisterUserRequestDto } from "./registerUserRequest.dto";

export class RegisterUserUseCase {
  constructor(public readonly userRepository: UserRepository) {}

  public execute(dataDto: RegisterUserRequestDto) {
    this.validateUser(dataDto);
    return this.userRepository.save(dataDto);
  }

  private validateUser(dataDto: RegisterUserRequestDto) {
    if (!dataDto.email || !dataDto.name || !dataDto.password)
      throw new Error("Invalid Data");
  }
}
