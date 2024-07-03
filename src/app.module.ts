import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "./config/config.module";
import { SharedModule } from "./shared/shared.module";
import { RolesModule } from "./roles/roles.module";
import { SessionsModule } from "./sessions/sessions.module";
import { APP_GUARD, Reflector } from "@nestjs/core";
import { AuthGuard } from "./auth/guards/auth.guard";
import { UsersRepository } from "./users/users.repository";
import { SessionsRepository } from "./sessions/sessions.repository";
import { JwtModule } from "./jwt/jwt.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ConfigModule,
    SharedModule,
    RolesModule,
    SessionsModule,
    JwtModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    UsersRepository,
    SessionsRepository,
    Reflector,
  ],
})
export class AppModule {}
