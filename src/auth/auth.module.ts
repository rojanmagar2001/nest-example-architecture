import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersRepository } from "src/users/users.repository";
import { SessionsRepository } from "src/sessions/sessions.repository";
import { JwtModule } from "src/jwt/jwt.module";

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, SessionsRepository],
})
export class AuthModule {}
