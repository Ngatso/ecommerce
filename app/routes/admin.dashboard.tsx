import { createSupabaseClient } from "~/services/supabase.server";
import {useLoaderData ,Link,NavLink,Outlet} from '@remix-run/react'
import { getUser } from "~/model/user";
import { useState } from "react";
import { LoaderArgs, redirect } from "@remix-run/node";
import { BsCalendar2Event } from 'react-icons/bs'
import { GiPrayer } from 'react-icons/gi'
import { BiRestaurant } from 'react-icons/bi'
import { createBrowserClient } from "@supabase/auth-helpers-remix";
export const loader = async ({ request }:LoaderArgs) => {
   const env = {
     SUPABASE_URL: process.env.SUPABASE_URL!,
     SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };
  const response = new Response();
  const supabase = createSupabaseClient({ request, response });
    const {
    data: { user },
    } = await supabase.auth.getUser();
  let userDB = await getUser(user?.email!);
  if (!userDB?.admin) return redirect("/");
   
    return { user:userDB ,env};
}

export default function Dashboard() {
  const { user,env } = useLoaderData();
  const [supabase] = useState(() =>
    createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );
    const pages = [
      { title: "events", Icon: BsCalendar2Event },
      { title: "restaurant", Icon: BiRestaurant },
      { title: "monastery", Icon: GiPrayer },
    ];
    return (
      <div className="flex">
    
        <aside
          id="sidebar-switch"
          className="relative top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="overflow-y-auto py-4 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <button
              id="dropdownUserNameButton"
              data-dropdown-toggle="dropdownUserName"
              className="flex justify-between items-center p-2 my-4 w-full rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-50 dark:hover-bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
              type="button"
            >
              <span className="sr-only">Open user menu</span>
              <div className="flex items-center">
                <img
                  src={user.avatar}
                  className="mr-3 w-8 h-8 rounded-full"
                  alt="avatar"
                />
                <div className="text-left">
                  <div className="font-semibold leading-none text-gray-900 dark:text-white mb-0.5">
                 {user.username}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </div>
                </div>
              </div>
           
            </button>
            <NavLink
              to="/"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              
              <span className="ml-3 capitalize">Home</span>
            </NavLink>
            <ul className="space-y-1.5">
              {pages.map((page) => {
                return (
                  <li key={page.title}>
                    <Link
                      to={`/admin/dashboard/${page.title}`}
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <page.Icon />
                      <span className="ml-3 capitalize">{page.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
            </aside>
        <Outlet context={{supabase}} />
      </div>
    );
}