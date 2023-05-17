import { createClient } from "@supabase/supabase-js";
import { getSession } from "./session.server";

// see documention about using .env variables
// https://remix.run/docs/en/v1/guides/envvars#server-environment-variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

export const supabaseClient = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
/**
 *
 * @param {*} request
 * @returns
 */
export const hasAuthSession = async (request) => {
  let session = await getSession(request.headers.get("Cookie"));
  if (!session.has("access_token")) throw Error("No session");
  supabaseClient.auth.setAuth(session.get("access_token"));
};
