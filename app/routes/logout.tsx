import { ActionArgs, ActionFunction, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { supabaseClient } from "~/services/db.server";
import { destroySession, getSession } from "~/services/session.server";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  let res = await supabaseClient.auth.signOut();
  console.log(res);
  //   console.log(res);
  //   const session = await getSession(request.headers.get("Cookie"));
  //   return redirect("/", {
  //     headers: {
  //       "set-cookie": await destroySession(session),
  //     },
  //   });
  return "ok";
};
