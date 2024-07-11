import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { RolesApiMessage } from "src/common/consts/api-message.const";
import {
  BaseResponseMapper,
  createResponseMapper,
} from "src/common/mappers/base-response.mapper";
import { RoleEntity } from "src/roles/entities/role.entity";
import { UserEntity } from "../entities/user.entity";

export class MultipleUserResponseMapper extends BaseResponseMapper<
  UserEntity[]
> {
  @ApiProperty({
    description: "Response message",
    example: RolesApiMessage.CREATED,
    type: String,
  })
  public message: string;

  @ApiProperty({
    description: "Response data",
    type: UserEntity,
    isArray: true,
  })
  public data: UserEntity[];

  public static map(
    message: string,
    data: UserEntity[]
  ): MultipleUserResponseMapper {
    return createResponseMapper(MultipleUserResponseMapper, message, data);
  }
}
