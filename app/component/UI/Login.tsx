import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";

export default function Login({ supabase, session }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailLogin = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }
  };
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  return (
    <div className="w-screen mt-28 flex justify-center items-center mb-3">
      {session ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <div className="flex flex-col gap-3 shadow p-5 rounded">
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
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="password"
            ></input>

            <div className="flex justify-between items-center gap-4 mt-3">
              <button
                onClick={handleEmailLogin}
                className=" flex-1 bg-gray-200 shadow text-sm bold p-2 hover:bg-gray-300 rounded"
              >
                LOGIN
              </button>
            </div>
            <center className="text-sm font-light text-gray-400">OR</center>
            <div className="px-6 sm:px-0 w-full ">
              <button
                onClick={signInWithGoogle}
                type="button"
                className="px-4 py-2 border w-full flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
              >
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                <span>Login with Google</span>
              </button>
            </div>
          </div>
          <span>
            Don't have an account ?
            <Link
              to="/auth/register"
              className="text-blue-400 hover:text-blue-500 ml-2"
            >
              Sign up
            </Link>
          </span>
        </div>
      )}
    </div>
  );
}
