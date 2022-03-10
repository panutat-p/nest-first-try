import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from "bcrypt";
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private logger = new Logger("UsersRepository");

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt: string = await bcrypt.genSalt();
    const hashedPassword: string = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === "23505") {
        this.logger.error(
          `cannot sign up, this username does already exist, error code: ${error.code}`,
          error.stack,
        );
        throw new ConflictException("This username does already exist");
      } else {
        this.logger.error(`cannot sign up`);
        throw new InternalServerErrorException();
      }
    }
  }
}
