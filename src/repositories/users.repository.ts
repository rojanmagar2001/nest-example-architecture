import { Injectable } from "@nestjs/common";
import type { Prisma, User } from "@prisma/client";
import type { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersRepository {
	constructor(private readonly prisma: PrismaService) {}
	async create(params: { data: Prisma.UserCreateInput }): Promise<User> {
		const { data } = params;

		return this.prisma.user.create({ data });
	}

	async findAll(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.UserWhereUniqueInput;
		where?: Prisma.UserWhereInput;
		orderBy?: Prisma.UserOrderByWithRelationInput;
	}): Promise<User[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.user.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
		});
	}

	async findUnique(params: {
		where: Prisma.UserWhereUniqueInput;
	}): Promise<User | null> {
		const { where } = params;
		return this.prisma.user.findUnique({ where });
	}

	async findOne(params: {
		where: Prisma.UserWhereInput;
		orderBy?: Prisma.UserOrderByWithRelationInput;
	}) {
		const { where, orderBy } = params;
		return this.prisma.user.findFirst({
			where,
			orderBy,
		});
	}

	async update(params: {
		where: Prisma.UserWhereUniqueInput;
		data: Prisma.UserUpdateInput;
	}): Promise<User> {
		const { where, data } = params;

		return this.prisma.user.update({ where, data });
	}
}
