import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserEntity implements User {
  @ApiProperty({
    description: "Role UUID",
    example: "123e4567-e89b-12d3-a456-426614174000",
    type: String,
  })
  public id: string;

  @ApiProperty({
    description: "User name",
    example: "John Doe",
    type: String,
  })
  public name: string;

  @ApiProperty({
    description: "User username",
    example: "johndoe",
    type: String,
  })
  public username: string;

  @ApiProperty({
    description: "User email",
    example: "johndoe@gmail.com",
    type: String,
  })
  public email: string;

  @Exclude()
  public password: string;

  @Exclude()
  public roleId: string;

  @ApiProperty({
    description: "User Active Status",
    example: true,
    type: Boolean,
  })
  public active: boolean;

  @ApiProperty({
    description: "User Created At",
    example: new Date(),
    type: Date,
  })
  public createdAt: Date;

  @ApiProperty({
    description: "User Updated At",
    example: new Date(),
    type: Date,
  })
  public updatedAt: Date;
}
