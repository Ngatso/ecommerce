import { db } from "~/services/db.server";

export async function findOrCreateUser(
  username: string,
  hashedPassword: string
) {
  // Try to find the user by username
  let user = await db.user.findUnique({ where: { username } });

  // If user doesn't exist, create a new user
  if (!user) {
    user = await db.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  }

  return user;
}
