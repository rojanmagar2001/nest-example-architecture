import { Injectable } from "@nestjs/common";
import type { IJwtPayload } from "./interfaces/jwt-payload.interface";
import type { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}
  sign(payload: IJwtPayload) {
    return this.jwtService.sign(payload, {
        secret
    });
  }
}
