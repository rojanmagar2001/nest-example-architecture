import { ApiProperty } from "@nestjs/swagger";
import {
  BaseResponseMapper,
  createResponseMapper,
} from "src/common/mappers/base-response.mapper";
import { RoleEntity } from "../entities/role.entity";
import { RolesApiMessage } from "src/common/consts/api-message.const";

export class MultipleRoleResponseMapper extends BaseResponseMapper<
  RoleEntity[]
> {
  @ApiProperty({
    description: "Response message",
    example: RolesApiMessage.FETCHED,
    type: String,
  })
  public message: string;

  @ApiProperty({
    description: "Response data",
    type: RoleEntity,
    isArray: true,
  })
  public data: RoleEntity[];

  public static map(
    message: string,
    data: RoleEntity[]
  ): MultipleRoleResponseMapper {
    return createResponseMapper(MultipleRoleResponseMapper, message, data);
  }
}
