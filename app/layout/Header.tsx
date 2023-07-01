import { Link,  useNavigation, } from "@remix-run/react";
import { useState, useEffect, } from "react";
import Cart from "../component/UI/Cart";
import type { profileType } from "~/model/user";
import { SupabaseClient } from "@supabase/supabase-js";
import CollapsibleComponent from "~/component/UI/Collapse";

type headerType = {
  user: profileType;
  supabase: SupabaseClient;
}

export default function Header({ user, supabase }:headerType) {
  let error = null;
  const [sidebarOpen,setSidebarOpen] = useState(false);
  const [menu2Open, setMenu2Open] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigation = useNavigation();
 
  useEffect(() => {
    setMenu2Open(false)
  }, [navigation.location?.pathname]);


  useEffect(() => {}, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
  };
  const toggleUserMenu = () => {
    setUserMenuOpen((p) => !p);
  };
  if (error) {
    return <div className="bg-red-300">{error.message}</div>;
  }
  let cityList = [
    "Dharamshala",
    "Delhi",
  ];
  return (
    <header
      className="  sticky top-0 transition-all z-10 bg-white  dark:bg-gray-700 dark:border-gray-600"
      style={{ height: 110, fontSize: 24 }}
    >
      <nav className="relative flex justify-between h-full gap-10">
        <div className="flex py-4 px-4 justify-start  flex-1">
          <div className="flex justify-start items-center md:hidden">
            <Cart />
          </div>
          <div className="hidden md:flex items-center flex-1">
            <ul className="flex gap-4 mx-[50px]  text-sm font-medium ">
              <li
                className="relative block  py-2 text-gray-800 hover:border-b-2 "
                style={{
                  fontSize: 18,
                }}
                onMouseEnter={() => {
                  setMenu2Open(true);
                }}
                onClick={() => setMenu2Open((p) => !p)}
              >
                Community
              </li>
            </ul>
          </div>
          <div className="absolute left-[50%] translate-x-[-50%]">
            <Link to="/">
              <img
                src="https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/025cc96d-48ff-459f-8c35-a5b4a0d82bc2/BlackLogo.png?format=1500w"
                className="mr-3 h-6 sm:h-9"
                style={{ width: 42, height: 57 }}
                alt="Ngatso Logo"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <div className="flex flex-wrap justify-between items-center px-4 md:px-6 py-2.5">
              <div className="flex items-center justify-around gap-4  ">
                <div className="flex opacity-70 hover:opacity-100">
                  <img
                    src="https://static1.squarespace.com/static/60de2756bdea384623d3b191/t/615d072ac39a1012f5cbde1e/1636730283619/output-onlinepngtools-3.png"
                    style={{ width: 22, objectFit: "contain", marginRight: 10 }}
                    loading="lazy"
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    className="border-0 outline-none focus:outline-none focus:border-none"
                  />
                </div>
                <div className="flex gap-5 items-center">
                  {user ? (
                    <>
                      <button
                        type="button"
                        onClick={toggleUserMenu}
                        className="relative flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-8 h-8 rounded-full"
                          src={user?.avatar}
                          alt="user photo"
                        />
                      </button>
                      {userMenuOpen && (
                        <div className="absolute top-10  z-20   my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                          <div className="py-3 px-4">
                            <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                              {user?.username}
                            </span>
                            <span className="block text-sm font-light text-gray-500 truncate dark:text-gray-400">
                              {user?.email}
                            </span>
                          </div>

                          <ul
                            className="py-1 font-light text-gray-500 dark:text-gray-400"
                            aria-labelledby="dropdown"
                          >
                            <li>
                              <div className="block cursor-pointer py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                {user?.admin && (
                                  <Link to="/admin/dashboard">Dashboard</Link>
                                )}
                              </div>
                            </li>
                            <li>
                              <div
                                onClick={handleLogout}
                                className="block cursor-pointer py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                LOGOUT
                              </div>
                            </li>
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to="/auth/login"
                      className="text-lg font-medium text-primary-600 dark:text-primary-500"
                    >
                      Login
                    </Link>
                  )}

                  <Cart />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden flex justify-center items-center ">
          {" "}
          <button
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="sr-only">Open sidebar</span>
            {!sidebarOpen ? (
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            ) : (
              <div style={{ fontSize: 40 }}>x</div>
            )}
          </button>
        </div>
      </nav>

   

      <div
        onMouseLeave={() => setMenu2Open(false)}
        style={{ height: 500 }}
        className={`${
          !menu2Open && "hidden"
        } overflow-hidden dropdown absolute top-[100%] left-0 right-0 w-full bg-white py-2 shadow-lg `}
      >
        <div className="p-3 flex justify-between gap-5 ml-5 h-full">
          <div className="flex flex-1 gap-8 ml-5 h-full">
            {cityList.map((city) => (
              <ul className="flex flex-col gap-4 w-fit text-base" key={city}>
                <h2 className="text-xl  font-extrabold">{city}</h2>
                <Link to={`/events?city=${city}`}>Events</Link>
                <Link to={`/monastery?city=${city}`}>Monasteries</Link>
                <Link to={`/restaurant?city=${city}`}>Eats</Link>
              </ul>
            ))}
            <ul className="flex ml-3 flex-col gap-4 text-base">
              <h2 className="text-xl font-extrabold">Social</h2>
              <Link to={'/youtube'}>
                Youtube
              </Link>
              <li>Spotify</li>
            </ul>
            <ul className="flex ml-3 flex-col gap-4 text-base">
              <h2 className="text-xl font-extrabold">Coming soon</h2>
            </ul>
          </div>
          <div className="">
            <img
              className="w-[270px]"
              src="https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/928b31a3-d83b-43c4-8a93-781b8178f09c/dalai+lama+globally.png?format=750w"
            />
          </div>
        </div>
      </div>
      {sidebarOpen && <MobileMenu setIsOpen={ setSidebarOpen} />}
    </header>
  );
}


function MobileMenu({ setIsOpen }) {

  return (
    <div
      style={{ width: "100%", height: "100dvh" }}
      className="bg-white absolute left-0 z-50 flex flex-col"
    >
      <CollapsibleComponent title="Community">
        <ul className="flex flex-col gap-4 w-fit text-base">
          <Link to={`/events`} onClick={() => setIsOpen(false)}>
            Events
          </Link>
          <Link to={`/monastery`} onClick={() => setIsOpen(false)}>
            Monasteries
          </Link>
          <Link to={`/restaurant`} onClick={() => setIsOpen(false)}>
            Eats
          </Link>
        </ul>
      </CollapsibleComponent>
      <CollapsibleComponent title="Shop">
        <ul className="flex flex-col gap-4 w-fit text-base">
          <li>kids</li>
          <li>Art Work</li>
          <li>Clothing</li>
          <li>Brand</li>
        </ul>
      </CollapsibleComponent>
      <CollapsibleComponent title="Social">
        <ul className="flex ml-3 flex-col gap-4 text-base">
          <li>Youtube</li>
          <li>Spotify</li>
        </ul>
      </CollapsibleComponent>
    </div>
  );
}