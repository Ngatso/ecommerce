import { Link, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import Cart from "../component/UI/Cart";

export default function Header({ user, supabase }) {
  let error = null;
  const [menu1Open, setMenu1Open] = useState(false);
  const [menu2Open, setMenu2Open] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    let getCart = async () => {
      let { data: profile, error } = await supabase
        .from("profile")
        .select("cart");
      return profile;
    };
    console.log(getCart());
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  };
  const toggleUserMenu = () => {
    setUserMenuOpen((p) => !p);
  };
  if (error) {
    return <div className="bg-red-300">{error.message}</div>;
  }
  return (
    <header
      className=" shadow-md sticky top-0 transition-all z-10 bg-white border-y border-gray-200 dark:bg-gray-700 dark:border-gray-600"
      style={{ height: 110, fontSize: 24 }}
    >
      <nav className="flex justify-between h-full gap-10">
        <div className="flex py-4 px-4 justify-between  flex-1">
          <div className="flex justify-center items-center md:hidden">
            <Cart />
          </div>
          <div className="hidden md:flex items-center flex-1">
            <ul className="flex gap-4 mx-[50px]  text-sm font-medium ">
              <li
                className="relative block  py-2 text-gray-800 hover:border-b-2"
                onMouseEnter={() => {
                  setMenu1Open(true);
                  setMenu2Open(false);
                }}
                onClick={() => setMenu1Open((p) => !p)}
                style={{
                  fontSize: 18,
                }}
              >
                Shop
              </li>
              <li
                className="relative block  py-2 text-gray-800 hover:border-b-2 "
                style={{
                  fontSize: 18,
                }}
                onMouseEnter={() => {
                  setMenu2Open(true);
                  setMenu1Open(false);
                }}
                onClick={() => setMenu2Open((p) => !p)}
              >
                Community
              </li>
            </ul>
          </div>
          <div className="flex items-center flex-1 justify-center">
            <Link to="/">
              <img
                src="https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/025cc96d-48ff-459f-8c35-a5b4a0d82bc2/BlackLogo.png?format=1500w"
                className="mr-3 h-6 sm:h-9"
                style={{ width: 42, height: 57 }}
                alt="Ngatso Logo"
              />
            </Link>
          </div>
        </div>
        <div className="md:hidden flex justify-center items-center mr-10">
          {" "}
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="hidden md:flex items-center mr-10">
          <div className="flex flex-wrap justify-between items-center px-4 md:px-6 py-2.5">
            <div className="flex items-center justify-around gap-4  ">
              <div className="flex opacity-70 hover:opacity-100">
                <img
                  src="https://static1.squarespace.com/static/60de2756bdea384623d3b191/t/615d072ac39a1012f5cbde1e/1636730283619/output-onlinepngtools-3.png"
                  style={{ width: 22, objectFit: "contain" }}
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 outline-none"
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
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
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
                            <a
                              href="#"
                              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                            >
                              My profile
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                            >
                              Account settings
                            </a>
                          </li>
                        </ul>
                        <ul
                          className="py-1 font-light text-gray-500 dark:text-gray-400"
                          aria-labelledby="dropdown"
                        >
                          <li>
                            <a
                              href="#"
                              className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              <svg
                                className="mr-2 w-5 h-5 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>{" "}
                              My likes
                            </a>
                          </li>
                        </ul>
                        <ul
                          className="py-1 font-light text-gray-500 dark:text-gray-400"
                          aria-labelledby="dropdown"
                        >
                          <li>
                            <div
                              onClick={handleLogout}
                              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
      </nav>

      <div
        onMouseLeave={() => setMenu1Open(false)}
        style={{ height: 500 }}
        className={`${
          !menu1Open && "hidden"
        } dropdown absolute top-[100%] left-0 right-0 w-full bg-white py-2 shadow-lg `}
      >
        <div className="p-3 flex justify-between gap-5 ml-5 h-full">
          <div className="flex flex-1 gap-8 ml-5 h-full">
            <ul className="flex flex-col gap-4 w-fit">
              <h2 className="text-xl  font-extrabold">Kids</h2>
              <li>Storybook</li>
              <li>Doll Accessories</li>
              <li>Dolls</li>
            </ul>
            <ul className="flex ml-3 flex-col gap-4">
              <h2 className="text-xl font-extrabold">Art Work</h2>
              <li>Paper Sculpture</li>
              <li>Print</li>
              <li>Wall Hanging</li>
            </ul>
            <ul className="flex ml-3 flex-col gap-4">
              <h2 className="text-xl font-extrabold">Clothing</h2>
              <li>T-shirts</li>
              <li>Jackets</li>
              <li>Hat</li>
              <li>Accessories</li>
            </ul>
            <ul className="flex ml-3 flex-col gap-4">
              <h2 className="text-xl font-extrabold">Brand</h2>
              <li>Men-Tsee-Khang</li>
              <li>Tenzin Quilling</li>
            </ul>
          </div>
          <div className="">
            <img
              className="w-[270px]"
              src="https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/55d94b2b-eee9-4719-97da-16de98604df1/sharWide.jpg?format=750w"
            />
          </div>
        </div>
      </div>

      <div
        onMouseLeave={() => setMenu2Open(false)}
        style={{ height: 500 }}
        className={`${
          !menu2Open && "hidden"
        } overflow-hidden dropdown absolute top-[100%] left-0 right-0 w-full bg-white py-2 shadow-lg `}
      >
        <div className="p-3 flex justify-between gap-5 ml-5 h-full">
          <div className="flex flex-1 gap-8 ml-5 h-full">
            <ul className="flex flex-col gap-4 w-fit">
              <h2 className="text-xl  font-extrabold">New Delhi</h2>
              <li>Ngatso Fest</li>
              <li>Events</li>
              <li>Monasteries</li>
              <li>Services</li>
              <li>Eats</li>
            </ul>
            <ul className="flex ml-3 flex-col gap-4">
              <h2 className="text-xl font-extrabold">Dharamsala</h2>
              <li>Events</li>
              <li>Monasteries</li>
            </ul>
            <ul className="flex ml-3 flex-col gap-4">
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
    </header>
  );
}
