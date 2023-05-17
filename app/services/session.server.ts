import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "sb:token",
      sameSite: "lax",
      secret: ["s3cret1"],
    },
  });

export async function getUserSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  let user = session.get("user")?.user;

  return user;
}

export { getSession, commitSession, destroySession };
