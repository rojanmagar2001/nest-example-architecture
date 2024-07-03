import { ApiProperty } from "@nestjs/swagger";
import { IAuthTokens } from "../interfaces/auth-token.interface";

export class AuthEntity implements IAuthTokens {
  @ApiProperty({
    description: "Access token",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjI5MzQwMzIyfQ.1Q8",
    type: String,
  })
  public accessToken: string;

  @ApiProperty({
    description: "Refresh token",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjI5MzQwMzIyfQ.1Q8",
    type: String,
  })
  public refreshToken: string;
}
