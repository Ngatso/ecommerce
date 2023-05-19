import {
  ActionArgs,
  ActionFunction,
  LoaderArgs,
  json,
  redirect,
} from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useAsyncValue,
  useFetcher,
  useLoaderData,
  useNavigate,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";
import { createServerClient } from "~/services/db.server";
import { useState, useEffect } from "react";
import Login from "~/component/UI/Login";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import Spinner from "~/component/UI/Spinner";
export const loader = async ({ request }: LoaderArgs) => {
  // environment variables may be stored somewhere other than
  // `process.env` in runtimes other than node
  // we need to pipe these Supabase environment variables to the browser
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  // We can retrieve the session on the server and hand it to the client.
  // This is used to make sure the session is available immediately upon rendering
  const response = new Response();

  const supabase = createServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) return redirect("/");
  // in order for the set-cookie header to be set,
  // headers must be returned as part of the loader response
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
        refreshFetcher.submit(null, {
          method: "post",
          action: "/handle-supabase-auth",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, supabase, refreshFetcher]);
  if (refreshFetcher.state !== "idle") return <Spinner />;
  return <Login session={session} supabase={supabase} />;
}
