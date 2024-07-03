import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import {
  BaseResponseMapper,
  createResponseMapper,
} from "src/common/mappers/base-response.mapper";
import { RoleEntity } from "../entities/role.entity";
import { RolesApiMessage } from "src/common/consts/api-message.const";

export class RoleResponseMapper extends BaseResponseMapper<RoleEntity> {
  @ApiProperty({
    description: "Response message",
    example: RolesApiMessage.CREATED,
    type: String,
  })
  public message: string;

  @ApiProperty({
    description: "Response data",
    type: RoleEntity,
  })
  public data: RoleEntity;

  public static map(message: string, data: RoleEntity): RoleResponseMapper {
    return createResponseMapper(RoleResponseMapper, message, data);
  }
}
