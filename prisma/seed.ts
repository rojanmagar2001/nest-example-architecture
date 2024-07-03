import { type Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seed file execution started");

  const user: Prisma.UserCreateInput = {
    email: "superadmin@gmail.com",
    username: "superadmin",
    password: await bcrypt.hash("superadmin", 10),
    name: "Super Admin",
    role: {
      create: {
        name: "superadmin",
        permissions: ["*"],
      },
    },
  };

  const userExists = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: user.email,
        },
        {
          username: user.username,
        },
      ],
    },
  });

  if (userExists) {
    console.log("User already exists");
    return;
  }

  const roleExists = await prisma.role.findUnique({
    where: {
      name: user.role.create?.name,
    },
  });

  if (roleExists) {
    console.log("Role already exists");
    return;
  }

  // Create a user with transaction
  await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: user,
    });
  });
}

main()
  .then(() => {
    prisma.$disconnect();
    console.log("Seed file execution completed");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
