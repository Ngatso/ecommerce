import { LoaderArgs, LoaderFunction, json } from "@remix-run/node";
import { useFetcher, useLoaderData, useOutletContext } from "@remix-run/react";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import Hero from "~/layout/Hero";
import { createServerClient } from "~/services/db.server";
import { useState, useEffect } from "react";
import Products from "~/layout/Products";
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
    data: { session },
  } = await supabase.auth.getSession();

  // in order for the set-cookie header to be set,
  // headers must be returned as part of the loader response
  let res = await fetch("https://dummyjson.com/products");
  let fakeProduct = await res.json();

  return json(
    {
      env,
      session,
      products: fakeProduct,
    },
    {
      headers: response.headers,
    }
  );
};

export default function Index() {
  const { env, session, products } = useLoaderData<typeof loader>();
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
  console.log(products);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Hero />
      <Products data={products} />
    </div>
  );
}
