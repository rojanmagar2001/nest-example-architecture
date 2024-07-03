import { Injectable } from "@nestjs/common";
import { Prisma, Role } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RolesRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: string): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: {
        id,
      },
    });
  }

  public async checkIfRoleExists(name: string): Promise<boolean> {
    const role = await this.prisma.role.findUnique({
      where: {
        name,
      },
    });

    return !!role;
  }

  public async create(data: Prisma.RoleCreateInput): Promise<Role> {
    return this.prisma.role.create({
      data,
    });
  }

  public async update(id: string, data: Prisma.RoleUpdateInput): Promise<Role> {
    return this.prisma.role.update({
      where: {
        id,
      },
      data,
    });
  }

  public async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }
}
