import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserResponseMapper } from "./mappers/user-response.mapper";
import { SessionUser } from "src/common/decorators/session-user.decoratior";
import { IUserSession } from "src/common/interfaces";
import { UsersApiMessage } from "src/common/consts/api-message.const";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
} from "@nestjs/swagger";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: UserResponseMapper,
    description: UsersApiMessage.CREATED,
  })
  @ApiConflictResponse({
    description: `${UsersApiMessage.EMAIL_EXISTS} | ${UsersApiMessage.USERNAME_EXISTS} | ${UsersApiMessage.INVALID_ROLE}`,
  })
  @ApiBody({
    type: CreateUserDto,
    description: "Json Schema for creating a new user",
  })
  public async create(
    @Body() body: CreateUserDto,
    @SessionUser() user: IUserSession
  ): Promise<UserResponseMapper> {
    const data = await this.usersService.create({ body, user });

    return UserResponseMapper.map(UsersApiMessage.CREATED, data);
  }
}
