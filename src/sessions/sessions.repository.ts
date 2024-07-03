import { Injectable } from "@nestjs/common";
import { Session } from "@prisma/client";
import { ISession } from "src/common/interfaces/session.interface";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SessionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findOneById(id: string): Promise<Session | null> {
    return this.prisma.session.findUnique({ where: { id } });
  }

  public async findOneByToken(token: string): Promise<Session | null> {
    return this.prisma.session.findUnique({ where: { token } });
  }

  public async findOneByUserIdAndUserAgent(
    userId: string,
    userAgent: string
  ): Promise<Session | null> {
    return this.prisma.session.findUnique({
      where: {
        unique_user_agent: {
          userId,
          userAgent,
        },
      },
    });
  }

  public async create(
    data: ISession & { expiresAt: Date; token: string; userId: string }
  ): Promise<Session> {
    return this.prisma.session.create({ data });
  }

  public async updateTokenAndExpiryAndDevice(
    id: string,
    data: { token: string; expiresAt: Date; accessToken: string } & ISession
  ) {
    return this.prisma.session.update({ where: { id }, data });
  }

  public async deleteById(id: string) {
    return this.prisma.session.delete({ where: { id } });
  }
}
