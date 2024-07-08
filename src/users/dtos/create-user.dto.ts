import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, Length } from "class-validator";
import { capitalize } from "lodash";

export class CreateUserDto {
  @ApiProperty({
    description: "User name",
    example: "John Doe",
    type: String,
  })
  @IsString()
  @Length(3, 50)
  @Transform(({ value }) => capitalize(value.trim().toLowerCase()))
  name: string;

  @ApiProperty({
    description: "User email",
    example: "johndoe@gmail.com",
    type: String,
  })
  @IsString()
  @IsEmail()
  @Length(5, 100)
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @ApiProperty({
    description: "User Name",
    example: "johndoe",
    type: String,
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: "User password",
    example: "password",
    type: String,
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: "User role ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
    type: String,
  })
  roleId: string;
}
