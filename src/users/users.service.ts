import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  public async findOneByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  public async findOneByUsernameOrEmail(user: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ username: user }, { email: user }],
      },
    });
  }

  public async checkUserExists(
    username: string,
    email: string
  ): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
  }
}
