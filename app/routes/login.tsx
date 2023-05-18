import { ActionArgs, ActionFunction, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useFetcher } from "@remix-run/react";
import { supabaseClient } from "~/services/db.server";
import { commitSession, getSession } from "~/services/session.server";
import { useEffect, useState } from "react";
export const action: ActionFunction = async ({ request }: ActionArgs) => {
  let formData = await request.formData();
  let email = formData.get("email") as string;
  let password = formData.get("password") as string;
  let access_token = formData.get("accessToken") as string;
  console.log(access_token);
  if (access_token) {
    let { data: authData, error: authError } =
      await supabaseClient.auth.getUser(access_token);
    if (!authError)
      return redirect("/", {
        headers: {
          "set-cookie": await commitSession(session, { sameSite: "lax" }),
        },
      });
    return { error: authError };
  }
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (data) {
    let { data: authData, error: authError } =
      await supabaseClient.auth.getUser(data.session?.access_token);
    let session = await getSession(request.headers.get("Cookie"));
    session.set("accessToken", data.session?.access_token);

    if (!authError)
      return redirect("/", {
        headers: {
          "set-cookie": await commitSession(session, { sameSite: "lax" }),
        },
      });
    return { error: authError };
  }
  return { error };
};

export default function Screen() {
  const actionData = useActionData();
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    if (window.location.hash) {
      var accessToken = window.location.hash.substring(14);
      setAccessToken(accessToken);
    }
  }, []);
  if (accessToken) {
    return (
      <div>
        Verification complete{" "}
        <Link to={`/confirm?accessToken=${accessToken}`}>
          click to go to Homepage
        </Link>
      </div>
    );
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Form method="post" className="flex flex-col gap-3 shadow p-5 rounded">
        <div>
          {actionData?.error ? (
            <div className="text-red-500">
              verify your email from your inbox
            </div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
          ></input>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="password"
          ></input>
        </div>
        <div className="flex justify-between items-center gap-4">
          <button
            type="submit"
            className="bg-gray-200 shadow bold p-2 hover:bg-gray-300"
          >
            LOGIN
          </button>
          <Link to="/register" className="text-gray-400 hover:text-gray-500">
            CREATE ACCOUNT
          </Link>
        </div>
      </Form>
    </div>
  );
}
