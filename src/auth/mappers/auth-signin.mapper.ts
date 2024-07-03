import { ApiProperty } from "@nestjs/swagger";
import { IAuthTokens } from "../interfaces/auth-token.interface";
import {
  BaseResponseMapper,
  createResponseMapper,
} from "src/common/mappers/base-response.mapper";
import { AuthEntity } from "../entities/auth.entity";
import { AuthApiMessage } from "src/common/consts/api-message.const";

export class AuthSignInResponseMapper extends BaseResponseMapper<AuthEntity> {
  @ApiProperty({
    description: "Response message",
    example: AuthApiMessage.SIGNIN,
    type: String,
  })
  public message: string;

  @ApiProperty({
    description: "Response data",
    type: AuthEntity,
  })
  public data: AuthEntity;

  public static map(
    message: string,
    data: AuthEntity
  ): AuthSignInResponseMapper {
    return createResponseMapper(AuthSignInResponseMapper, message, data);
  }
}
