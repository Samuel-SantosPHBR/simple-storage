import { Repository } from "typeorm";
import { AppDataSource } from "../database/appDataSource";
import { User } from "../entities";
import { LoginUserRequestDto } from "../use-cases/user/login/loginUserRequest.dto";
import { RegisterUserRequestDto } from "../use-cases/user/register/registerUserRequest.dto";

export class UserRepository {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  public async save(user: RegisterUserRequestDto): Promise<User> {
    return this.userRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      email,
    });
  }

  public async findByEmailAndPassword(
    user: LoginUserRequestDto
  ): Promise<User | null> {
    return this.userRepository.findOneBy(user);
  }
}
