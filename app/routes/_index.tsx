import { LoaderArgs, LoaderFunction, json } from "@remix-run/node";
import Hero from "~/layout/Hero";
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  return json({
    env,
  });
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Hero />
    </div>
  );
}
