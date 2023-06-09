import {
  ActionArgs,
  ActionFunction,
  LoaderArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { createSupabaseClient } from "~/services/supabase.server";
import { useState, useEffect } from "react";
import Login from "~/component/UI/Login";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import Spinner from "~/component/UI/Spinner";
export const loader = async ({ request }: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };
  const response = new Response();

  const supabase = createSupabaseClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) return redirect("/");
  return json(
    {
      env,
      session,
    },
    {
      headers: response.headers,
    }
  );
};

export default function Screen() {
  const { env, session } = useLoaderData<typeof loader>();
  const refreshFetcher = useFetcher();
  const [supabase] = useState(() =>
    createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );
  const serverAccessToken = session?.access_token;
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        session?.access_token !== serverAccessToken &&
        refreshFetcher.state === "idle"
      ) {
        // server and client are out of sync.
        // Remix recalls active loaders after actions complete
        refreshFetcher.submit(
          {
            user: JSON.stringify(session?.user),
          },
          {
            method: "post",
            action: "/handle-supabase-auth",
          }
        );
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, supabase, refreshFetcher]);
  if (refreshFetcher.state !== "idle") return <Spinner />;
  return <Login session={session} supabase={supabase} />;
}
