import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { auth } from "~/services/auth.server";
import { sessionStorage } from "~/services/session.server";
export const action = async ({ request }: ActionArgs) => {
  await auth.authenticate("user-pass", request, {
    successRedirect: "/private",
    failureRedirect: "/login",
  });
};

type LoaderError = { message: string } | null;
export const loader = async ({ request }: LoaderArgs) => {
  await auth.isAuthenticated(request, { successRedirect: "/private" });
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const error = session.get(auth.sessionErrorKey) as LoaderError;
  return json({ error });
};

export default function Screen() {
  const { error } = useLoaderData<typeof loader>();

  return (
    <Form method="post">
      {error ? <div>{error.message}</div> : null}
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          id="username"
          defaultValue="user@domain.tld"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          defaultValue="test"
        />
      </div>

      <button>Log In</button>
    </Form>
  );
}
