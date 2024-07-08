import { Body, Controller, Get, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dtos/create-role.dto";
import { SessionUser } from "src/common/decorators/session-user.decoratior";
import { IUserSession } from "src/common/interfaces";
import { RoleResponseMapper } from "./mappers/role-response.mapper";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from "@nestjs/swagger";
import { RolesApiMessage } from "src/common/consts/api-message.const";
import { MultipleRoleResponseMapper } from "./mappers/multiple-role.mapper";

@ApiTags("roles")
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: RoleResponseMapper,
    description: RolesApiMessage.CREATED,
  })
  @ApiConflictResponse({ description: RolesApiMessage.ALREADY_EXISTS })
  @ApiBody({
    type: CreateRoleDto,
    description: "Json Schema for creating a new role",
  })
  public async create(
    @SessionUser() user: IUserSession,
    @Body() body: CreateRoleDto
  ) {
    const data = await this.rolesService.create({
      body,
      user,
    });

    return RoleResponseMapper.map(RolesApiMessage.CREATED, data);
  }

  @Get()
  @ApiProperty({
    description: "Get all roles",
    type: MultipleRoleResponseMapper,
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    type: MultipleRoleResponseMapper,
    description: RolesApiMessage.FETCHED_ALL,
  })
  public async get(@SessionUser() user: IUserSession) {
    const data = await this.rolesService.findAll();

    return MultipleRoleResponseMapper.map(RolesApiMessage.FETCHED_ALL, data);
  }
}
