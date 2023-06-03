import { db } from "~/services/db.server";
import { sendMail } from "~/services/sendmail.server";

export async function checkUser(user) {
  const profile = await db.profile.findUnique({
    where: {
      email: user.email,
    },
  });

  if (profile) {
    return profile;
  } else {
    let newUser = await db.profile.create({
      data: {
        username: user.user_metadata.name,
        email: user.email,
        avatar: user.user_metadata.picture,
      },
    });
    let html = `<h1>Welcome ${newUser.username} </h1>`;
    sendMail("newUserCreated", html);
    return newUser;
  }
}
