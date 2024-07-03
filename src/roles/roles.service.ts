import { ConflictException, Injectable } from "@nestjs/common";
import { RolesRepository } from "./roles.repository";
import { SessionUserParam } from "src/common/interfaces";
import { CreateRoleDto } from "./dtos/create-role.dto";
import { Role } from "@prisma/client";
import { RolesApiMessage } from "src/common/consts/api-message.const";

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  public async create({
    body,
    user,
  }: SessionUserParam.ICreate<CreateRoleDto>): Promise<Role> {
    const roleExists = await this.rolesRepository.checkIfRoleExists(body.name);

    if (roleExists) {
      throw new ConflictException(RolesApiMessage.ALREADY_EXISTS);
    }

    return this.rolesRepository.create(body);
  }

  public async findAll(): Promise<Role[]> {
    return this.rolesRepository.findAll();
  }
}
