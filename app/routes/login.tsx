import { ActionArgs, ActionFunction, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { supabaseClient } from "~/services/db.server";
import { commitSession, getSession } from "~/services/session.server";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  let formData = await request.formData();
  let email = formData.get("email") as string;
  let password = formData.get("password") as string;
  const { data: user, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
  if (user) {
    let session = await getSession(request.headers.get("Cookie"));
    session.set("user", user?.access_token);
    return redirect("/", {
      headers: {
        "set-cookie": await commitSession(session, { sameSite: "lax" }),
      },
    });
  }

  return { user, error };
};

export default function Screen() {
  const actionData = useActionData();
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Form method="post" className="flex flex-col gap-3 shadow p-5 rounded">
        <div>{actionData?.error ? actionData.error?.message : null}</div>
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
        <div className="flex justify-between">
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
