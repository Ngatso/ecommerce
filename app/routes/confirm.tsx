import { LoaderFunction, redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/services/session.server";
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const access_token = url.searchParams.get("accessToken");
  if (access_token) {
    let session = await getSession(request.headers.get("Cookie"));
    session.set("accessToken", access_token);
    return redirect("/", {
      headers: {
        "set-cookie": await commitSession(session, { sameSite: "lax" }),
      },
    });
  }
  return null;
};
