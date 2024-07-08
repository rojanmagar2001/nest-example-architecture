import { Body, Controller, Post, Req } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SignInDto } from "./dtos/signin.dto";
import { Request } from "express";
import { extractGeoIpInformation } from "src/common/utils/geo-ip";
import { AuthService } from "./auth.service";
import { AuthSignInResponseMapper } from "./mappers/auth-signin.mapper";
import { Public } from "src/common/decorators/route-type.decorator";
import { AuthApiMessage } from "src/common/consts/api-message.const";

@Public()
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("signin")
  @ApiProperty({
    description: "Sign in",
    type: AuthSignInResponseMapper,
  })
  @ApiCreatedResponse({
    type: AuthSignInResponseMapper,
    description: AuthApiMessage.SIGNIN,
  })
  @ApiUnauthorizedResponse({ description: AuthApiMessage.INVALID_CREDENTIALS })
  async signin(@Body() body: SignInDto, @Req() req: Request) {
    // Implementation goes here
    const session = extractGeoIpInformation(req);

    const data = await this.service.login(body, session);

    return AuthSignInResponseMapper.map(AuthApiMessage.SIGNIN, data);
  }
}
