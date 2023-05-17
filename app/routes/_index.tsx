import {
  ActionArgs,
  ActionFunction,
  LoaderArgs,
  LoaderFunction,
  V2_MetaFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import Header from "~/layout/Header";
import Hero from "~/layout/Hero";
import {
  destroySession,
  getSession,
  getUserSession,
} from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const redirectTo = new URL(request.url).pathname;
  let user = await getUserSession(request);

  return { user };
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  // get session
  let session = await getSession(request.headers.get("Cookie"));

  // destroy session and redirect to login page
  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Header />
      <Hero />
    </div>
  );
}
