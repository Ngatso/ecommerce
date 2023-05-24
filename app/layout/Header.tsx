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
      <nav className="bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600 border-y">
        <div className="flex py-4 px-4 mx-auto max-w-screen-xl justify-between md:px-6">
          {/* <form className="flex mb-4 lg:order-2 lg:mb-0">
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
          </form> */}

          <div className="flex items-center ">
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
          <div className="flex flex-wrap justify-between items-center px-4 md:px-6 py-2.5">
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

              <Cart />
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
