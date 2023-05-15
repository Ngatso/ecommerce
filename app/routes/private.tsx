import { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { auth } from "~/services/auth.server";

export async function loader({ request }: LoaderArgs) {
  let user = await auth.isAuthenticated(request);
  return user;
}

export async function action({ request }: ActionArgs) {
  return await auth.logout(request, { redirectTo: "/login" });
}

export default function () {
  let data = useLoaderData();
  return (
    <>
      {data} user loggedIn
      <Form method="post">
        <button type="submit">logout</button>
      </Form>
    </>
  );
}
