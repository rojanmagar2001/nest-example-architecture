import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export class RoleEntity implements Role {
  @ApiProperty({
    description: "Role UUID",
    example: "123e4567-e89b-12d3-a456-426614174000",
    type: String,
  })
  public id: string;

  @ApiProperty({
    description: "Role name",
    example: "Admin",
    type: String,
  })
  public name: string;

  @ApiProperty({
    description: "Role Permissions",
    example: ["read:users", "write:users"],
    type: [String],
  })
  public permissions: string[];

  @ApiProperty({
    description: "Role Created At",
    example: new Date(),
    type: Date,
  })
  public createdAt: Date;

  @ApiProperty({
    description: "Role Updated At",
    example: new Date(),
    type: Date,
  })
  public updatedAt: Date;
}
