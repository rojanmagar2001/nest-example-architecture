import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "src/jwt/jwt.service";
import { SessionsRepository } from "src/sessions/sessions.repository";
import { UsersRepository } from "src/users/users.repository";
import { SignInDto } from "./dtos/signin.dto";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { ISession } from "src/common/interfaces";
import { TokenTypeEnum } from "src/jwt/enums/token-type.enum";
import { ConfigService } from "src/config/config.service";
import { IAuthTokens } from "./interfaces/auth-token.interface";
import { AuthApiMessage } from "src/common/consts/api-message.const";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly sessionsRepository: SessionsRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async login(body: SignInDto, session: ISession): Promise<IAuthTokens> {
    const { email, password } = body;

    const user = await this.usersRepository.findOneByEmail(email);

    if (!user)
      throw new UnauthorizedException(AuthApiMessage.INVALID_CREDENTIALS);

    await this.validatePassword(user, password);

    const oldSession =
      await this.sessionsRepository.findOneByUserIdAndUserAgent(
        user.id,
        session.userAgent
      );

    if (oldSession) {
      //! If the user has an existing session, update the token and expiry
      const { accessToken, refreshToken } = await this.generateAuthTokens(
        oldSession.id
      );

      await this.sessionsRepository.updateTokenAndExpiryAndDevice(
        oldSession.id,
        {
          token: refreshToken,
          expiresAt: this.getExpiryDate(TokenTypeEnum.REFRESH),
          accessToken,
          userAgent: session.userAgent,
          geo: session.geo,
          ip: session.ip,
          image: session.image,
          device: session.device,
          type: session.type,
          os: session.os,
          browser: session.browser,
          model: session.model,
        }
      );

      return {
        accessToken,
        refreshToken,
      };
    }

    //! If the user does not have an existing session, create a new session
    const newSession = await this.sessionsRepository.create({
      userId: user.id,
      userAgent: session.userAgent,
      geo: session.geo,
      ip: session.ip,
      image: session.image,
      device: session.device,
      type: session.type,
      os: session.os,
      browser: session.browser,
      model: session.model,
      token: "",
      expiresAt: new Date(),
    });

    const { accessToken, refreshToken } = await this.generateAuthTokens(
      newSession.id
    );

    if (!accessToken || !refreshToken) {
      await this.sessionsRepository.deleteById(newSession.id);

      throw new ConflictException(AuthApiMessage.FAILED_TO_GENERATE_TOKEN);
    }

    await this.sessionsRepository.updateTokenAndExpiryAndDevice(newSession.id, {
      token: refreshToken,
      expiresAt: this.getExpiryDate(TokenTypeEnum.REFRESH),
      accessToken,
      userAgent: session.userAgent,
      geo: session.geo,
      ip: session.ip,
      image: session.image,
      device: session.device,
      type: session.type,
      os: session.os,
      browser: session.browser,
      model: session.model,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async validatePassword(user: User, password: string) {
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid)
      throw new UnauthorizedException(AuthApiMessage.INVALID_CREDENTIALS);
  }

  private getExpiryDate(tokenType: TokenTypeEnum) {
    return tokenType === TokenTypeEnum.ACCESS
      ? new Date(Date.now() + 1000 * 60 * 15)
      : new Date(
          Date.now() +
            1000 *
              60 *
              60 *
              24 *
              Number.parseInt(
                this.configService.get("JWT_REFRESH_EXPIRATION"),
                30
              )
        );
  }

  private async generateAuthTokens(sessionId: string): Promise<IAuthTokens> {
    const accessToken = await this.jwtService.generateToken(
      {
        sessionId,
      },
      TokenTypeEnum.ACCESS
    );

    const refreshToken = await this.jwtService.generateToken(
      {
        sessionId,
      },
      TokenTypeEnum.REFRESH
    );

    if (!accessToken || !refreshToken) {
      throw new ConflictException(AuthApiMessage.FAILED_TO_GENERATE_TOKEN);
    }

    return {
      accessToken,
      refreshToken,
    };
  }
}
