import { AppDataSource } from "../database/appDataSource";
import { User } from "../entities";
import { RegisterUserRequestDto } from "../use-cases/user/register/registerUserRequest.dto";

export class UserRepository {
  public async save(user: RegisterUserRequestDto): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    return userRepository.save({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}
