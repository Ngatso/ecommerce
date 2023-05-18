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
import { supabaseClient } from "~/services/db.server";
import {
  destroySession,
  getSession,
  getUserSession,
} from "~/services/session.server";

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderArgs) => {
  let session = await getSession(request.headers.get("Cookie"));
  let access_token = session.get("accessToken");

  if (!access_token) return { data: { user: null }, error: null };
  return await supabaseClient.auth.getUser(access_token);
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Header />
      <Hero />
    </div>
  );
}
