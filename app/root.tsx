import { cssBundleHref } from "@remix-run/css-bundle";
import {
  LinksFunction,
  LoaderArgs,
  LoaderFunction,
  json,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  V2_MetaFunction,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import stylesheet from "~/style/tailwind.css";
import globalsheet from "~/style/global.css";
import Header from "./layout/Header";
import { createServerClient } from "./services/db.server";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import { useEffect, useState } from "react";
import Footer from "./layout/Footer";
import { createUserProfile } from "./model/user";
export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: globalsheet },
  {
    rel: "icon",
    href: "/favicon-light.png",
    type: "image/png",
  },
];
export const meta: V2_MetaFunction = () => {
  return [
    { title: "Tibetan Homemade Product" },
    {
      property: "og:title",
      content: "Tibetan Ecommerce",
    },
    {
      name: "description",
      content: "This is best place to buy",
    },
  ];
};
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  // We can retrieve the session on the server and hand it to the client.
  // This is used to make sure the session is available immediately upon rendering
  const response = new Response();

  const supabase = createServerClient({ request, response });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // in order for the set-cookie header to be set,
  // headers must be returned as part of the loader response
  return json(
    {
      env,
      user,
      session,
    },
    {
      headers: response.headers,
    }
  );
};
export default function App() {
  const { env, user, session } = useLoaderData<typeof loader>();

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
      if (event === "SIGNED_IN" && user) {
        // User logged in successfully, create user profile

        createUserProfile(user, supabase);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, supabase, refreshFetcher]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header user={user} supabase={supabase} />
        <Outlet context={{ supabase, session }} />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
      </body>
    </html>
  );
}
