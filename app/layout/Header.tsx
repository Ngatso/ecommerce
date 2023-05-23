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
    <header className=" shadow-md sticky top-0 transition-all z-10 ">
      <nav className="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
          <Link to="/" className="flex items-center">
            <img
              src="https://images.squarespace-cdn.com/content/v1/60de2756bdea384623d3b191/025cc96d-48ff-459f-8c35-a5b4a0d82bc2/BlackLogo.png?format=1500w"
              className="mr-3 h-6 sm:h-9"
              alt="Ngatso Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Ngatso
            </span>
          </Link>
          <div className="flex items-center">
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
                className="text-sm font-medium text-primary-600 dark:text-primary-500 hover:underline"
              >
                Login
              </Link>
            )}
            <span className="mr-0 ml-2 w-px h-5 bg-gray-200 dark:bg-gray-600 lg:inline lg:mr-3 lg:ml-5"></span>
            <a
              href="#"
              className="inline-flex items-center p-2 text-sm font-medium text-gray-500 rounded-lg dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center p-2 text-sm font-medium text-gray-500 rounded-lg dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center p-2 text-sm font-medium text-gray-500 rounded-lg dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center p-2 text-sm font-medium text-gray-500 rounded-lg dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
              </svg>
            </a>
            <Cart />
          </div>
        </div>
      </nav>
      <nav className="bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600 border-y">
        <div className="grid py-4 px-4 mx-auto max-w-screen-xl lg:grid-cols-2 md:px-6">
          <form className="flex mb-4 lg:order-2 lg:mb-0">
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg   border-l-1 md:border-l-6 border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-l-gray-600  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary-500"
                placeholder="Search anything..."
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-primary-700 rounded-r-lg border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="black"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
          <div className="flex items-center lg:order-1">
            <ul className="flex  mt-0 space-x-8 text-sm font-medium">
              <li
                className="relative block px-4 py-2 text-gray-800"
                onMouseEnter={() => {
                  setMenu1Open(true);
                  setMenu2Open(false);
                }}
                onClick={() => setMenu1Open((p) => !p)}
                style={{
                  fontSize: 18,
                }}
              >
                Shopping
              </li>
              <li
                className="relative block px-4 py-2 text-gray-800"
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
        </div>
      </nav>

      <div
        onMouseLeave={() => setMenu1Open(false)}
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
        className={`${
          !menu2Open && "hidden"
        } overflow-hidden dropdown max-h-[300px] absolute top-[100%] left-0 right-0 w-full bg-white py-2 shadow-lg `}
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
