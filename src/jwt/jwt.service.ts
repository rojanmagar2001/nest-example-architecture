import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "src/config/config.service";
import { IAccessPayload } from "./interfaces/access-token.interface";
import { TokenTypeEnum } from "./enums/token-type.enum";
import jwt from "jsonwebtoken";
import { IRefreshPayload } from "./interfaces/refresh-token.interface";

@Injectable()
export class JwtService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;
  private readonly accessExpiration: string;
  private readonly refreshExpiration: string;
  private readonly logger = new Logger(JwtService.name);
  constructor(private readonly configService: ConfigService) {
    this.accessSecret = this.configService.get("JWT_ACCESS_SECRET");
    this.refreshSecret = this.configService.get("JWT_REFRESH_SECRET");
    this.accessExpiration = this.configService.get("JWT_ACCESS_EXPIRATION");
    this.refreshExpiration = this.configService.get("JWT_REFRESH_EXPIRATION");

    this.logger.log("JwtService instantiated");
  }

  public async generateToken(
    payload: IAccessPayload | IRefreshPayload,
    type: TokenTypeEnum
  ): Promise<string | null> {
    switch (type) {
      case TokenTypeEnum.ACCESS: {
        return jwt.sign(payload, this.accessSecret, {
          expiresIn: this.accessExpiration,
        });
      }
      case TokenTypeEnum.REFRESH: {
        return jwt.sign(payload, this.refreshSecret, {
          expiresIn: this.refreshExpiration,
        });
      }
      default: {
        this.logger.error("Invalid token type");
        return null;
      }
    }
  }

  public async verifyToken(
    token: string,
    type: TokenTypeEnum
  ): Promise<IAccessPayload | IRefreshPayload | null> {
    switch (type) {
      case TokenTypeEnum.ACCESS: {
        const decoded = jwt.verify(token, this.accessSecret) as
          | IAccessPayload
          | jwt.VerifyErrors;

        if (
          decoded instanceof jwt.JsonWebTokenError ||
          decoded instanceof jwt.TokenExpiredError ||
          decoded instanceof jwt.NotBeforeError
        ) {
          return null;
        }

        return decoded;
      }
      case TokenTypeEnum.REFRESH: {
        const decoded = jwt.verify(token, this.refreshSecret) as
          | IRefreshPayload
          | jwt.VerifyErrors;

        if (
          decoded instanceof jwt.JsonWebTokenError ||
          decoded instanceof jwt.TokenExpiredError ||
          decoded instanceof jwt.NotBeforeError
        ) {
          return null;
        }

        return decoded;
      }
      default: {
        this.logger.error("Invalid token type");
        return null;
      }
    }
  }
}
