import { ConflictException, Injectable } from "@nestjs/common";
import { SessionUserParam } from "src/common/interfaces";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "@prisma/client";
import { UsersRepository } from "./users.repository";
import { UsersApiMessage } from "src/common/consts/api-message.const";
import { RolesRepository } from "src/roles/roles.repository";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository
  ) {}

  async create({
    body,
  }: SessionUserParam.ICreate<CreateUserDto>): Promise<User> {
    const emailExists = await this.usersRepository.findOneByEmail(body.email);

    if (emailExists) {
      throw new ConflictException(UsersApiMessage.EMAIL_EXISTS);
    }

    const usernameExists = await this.usersRepository.findOneByUsername(
      body.username
    );

    if (usernameExists) {
      throw new ConflictException(UsersApiMessage.USERNAME_EXISTS);
    }

    const role = await this.rolesRepository.findById(body.roleId);

    if (!role) {
      throw new ConflictException(UsersApiMessage.INVALID_ROLE);
    }

    return this.usersRepository.create(body);
  }

  async get(_params: SessionUserParam.IGetAll): Promise<User[]> {
    return this.usersRepository.findAll();
  }
}
