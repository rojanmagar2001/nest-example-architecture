import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEnum, IsString } from "class-validator";
import { permissionConsts } from "src/common/consts/permission.const";

export class CreateRoleDto {
  @ApiProperty({
    description: "Role name",
    example: "admin",
    type: String,
  })
  @IsString()
  @Transform(({ value }) => value.trim().toLowerCase())
  name: string;

  @ApiProperty({
    description: "Role permissions",
    example: ["read:users", "write:users"],
    type: Array,
  })
  @IsArray()
  @IsString({ each: true })
  @IsEnum(permissionConsts, { each: true })
  @ArrayNotEmpty()
  @Transform(({ value }) => value)
  permissions: string[];
}
