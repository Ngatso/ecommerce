// import {
//   ActionArgs,
//   ActionFunction,
//   LoaderArgs,
//   LoaderFunction,
//   redirect,
// } from "@remix-run/node";
// import { supabaseClient } from "~/services/db.server";
// import { destroySession, getSession } from "~/services/session.server";

// export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
//   let session = await getSession(request.headers.get("Cookie"));
//   let { error } = await supabaseClient.auth.signOut();
//   // destroy session and redirect to login page
//   if (!error)
//     return redirect("/", {
//       headers: { "Set-Cookie": await destroySession(session) },
//     });
//   return redirect("/");
// };

// export const action: ActionFunction = async ({ request }: ActionArgs) => {
//   // get session
// };
