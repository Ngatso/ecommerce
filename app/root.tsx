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
  useLocation
} from "@remix-run/react";
import stylesheet from "~/style/tailwind.css";
import globalsheet from "~/style/global.css";
import lightBoxsheet from "yet-another-react-lightbox/styles.css";
import Header from "./layout/Header";
import { createSupabaseClient } from "./services/supabase.server";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import { useEffect, useState } from "react";
import Footer from "./layout/Footer";
import Sidebar from "./layout/Sidebar";
import { checkUser } from "./model/user";
import { db } from "./services/db.server";
let bumdle = cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [];
export const links = () => [
  ...bumdle,
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: globalsheet },
  { rel: "stylesheet", href: lightBoxsheet },
  {
    rel: "icon",
    href: "/favicon-light.png",
    type: "image/png",
  },
  {
    rel: "stylesheet",
    href: "https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css",
  },
];
export const meta: V2_MetaFunction = () => {
  return [
    { title: "Tibetan Events" },
    {
      property: "og:title",
      content: "Tibetan Ecommerce",
    },
    {
      name: "description",
      content: "This is best place to buy",
    },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    {charSet:"utf-8"}

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

  const supabase = createSupabaseClient({ request, response });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // in order for the set-cookie header to be set,
  // headers must be returned as part of the loader response
  return json(
    {
      env,
      user: user ? await checkUser(user) : null,
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
  let location = useLocation();
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
  const isAdminPage =location.pathname.includes('admin')
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body style={{ fontFamily: "serif" }}>
        {!isAdminPage && <Header user={user} supabase={supabase} />}
        <Outlet context={{ supabase, session }} />
        <Sidebar />
        {!isAdminPage && <Footer />}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
