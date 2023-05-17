import { db } from "~/services/db.server";

export async function find(username: string) {
  // Try to find the user by username
  let user = await db.user.findUnique({ where: { username } });

  return user;
}

export async function create(
  username: string,
  email: string,
  password: string
) {
  try {
    let createdUser = await db.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    return createdUser;
  } catch (e) {
    throw new Error("cannot create a user");
  }
}
