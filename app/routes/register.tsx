import { ActionArgs, ActionFunction, json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useFetcher,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import { createBrowserClient } from "@supabase/auth-helpers-remix";

import { useState } from "react";

const validateForm = (
  email: string,
  password: string,
  confirmPassword: string
) => {
  let message: string[] = [];
  if (typeof email !== "string" || typeof password !== "string") {
    message = [...message, "type of email or password not string"];
  }
  if (password !== confirmPassword) {
    message = [...message, "password does not match"];
  }
  if (password.length < 8) {
    message = [...message, "password is too short"];
  }
  return message.length ? message : false;
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  let formData = await request.formData();
  let email = formData.get("email") as string;
  let password = formData.get("password") as string;
  let password2 = formData.get("password2") as string;
  let error = validateForm(email, password, password2);
  if (error) {
    return json({
      message: error,
    });
  } else {
    const supabase = createBrowserClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );

    let auth = await supabase.auth.signUp({
      email,
      password,
    });
    if (auth?.data?.user?.aud === "authenticated") {
      return redirect("/login", {
        headers: request.headers,
      });
    }
  }
};

export default function Register() {
  let formFetcher = useFetcher();
  let error = formFetcher.data;
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      {error?.message &&
        error?.message?.map((l, i) => {
          return (
            <p key={i} className="text-red-300">
              {l}
            </p>
          );
        })}
      <formFetcher.Form
        method="post"
        className="flex flex-col gap-3 shadow p-5 rounded"
      >
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
            htmlFor="password"
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
        <div>
          <label
            htmlFor="password2"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            confirm password
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="confirm password"
          ></input>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-gray-200 shadow bold p-2 hover:bg-gray-300"
          >
            Sign Up
          </button>
          <Link to="/login" className="text-gray-400 hover:text-gray-500">
            Log In
          </Link>
        </div>
      </formFetcher.Form>
    </div>
  );
}
