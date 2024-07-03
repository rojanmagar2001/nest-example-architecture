import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { IUserSession } from "src/common/interfaces";
import { TokenTypeEnum } from "src/jwt/enums/token-type.enum";
import { JwtService } from "src/jwt/jwt.service";
import { SessionsRepository } from "src/sessions/sessions.repository";
import { UsersRepository } from "src/users/users.repository";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersRepository: UsersRepository,
    private readonly sessionsRepository: SessionsRepository,
    private readonly jwtService: JwtService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isPublicRoute(context, this.reflector)) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);

    if (!token) return false;

    const payload = await this.jwtService.verifyToken(
      token,
      TokenTypeEnum.ACCESS
    );

    if (!payload) return false;

    const session = await this.sessionsRepository.findOneById(
      payload.sessionId
    );

    if (!session) return false;

    const user = await this.usersRepository.findOneById(session.userId);

    if (!user) return false;

    const sessionPayload: IUserSession = {
      name: user.name,
      email: user.email,
      id: user.id,
      sessionId: session.id,
    };

    request.user = sessionPayload;

    return true;
  }

  private isPublicRoute(ctx: ExecutionContext, reflector: Reflector): boolean {
    const isPublic = reflector.getAllAndOverride("isPublic", [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (isPublic) return true;

    return false;
  }

  private extractTokenFromRequest(request: Request): string | null {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return null;
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      return null;
    }

    return token;
  }
}
