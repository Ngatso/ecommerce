import { db } from "~/services/db.server";
import { sendMail } from "~/services/sendmail.server";

 export type profileType = {
  id: string;
  created_at?: Date;
  username?: string;
  email?: string;
  mobile?: string;
  avatar?: string;
  address?: string;
  admin?: boolean;
};


export async function checkUser(user:any) {
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
    // sendMail("newUserCreated", html);
    return newUser;
  }
}

export async function getUser(email: string) {
  if (email) {
    try {
      const profile = await db.profile.findUnique({
        where: {
          email
        }
      })

      return profile;
    } catch (e) {
      throw new Error('user database error')
    }
  }
  else {
    return null;
  }
}
