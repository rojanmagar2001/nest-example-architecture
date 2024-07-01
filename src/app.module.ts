import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "./config/config.module";
import { SharedModule } from './shared/shared.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
	imports: [AuthModule, UsersModule, PrismaModule, ConfigModule, SharedModule, JwtModule],
	providers: [],
})
export class AppModule {}
