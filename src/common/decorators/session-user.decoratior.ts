import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from "@nestjs/common";
import { IUserSession } from "../interfaces";

export const SessionUser = createParamDecorator(
  (data: undefined, ctx: ExecutionContext): IUserSession => {
    const request = ctx.switchToHttp().getRequest();

    const user = request.user as IUserSession;

    if (!user) throw new UnauthorizedException();

    return user;
  }
);
