/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { classNames } from "~/utils/common";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SidebarNavigation from "~/components/navigation/SidebarNavigation";
import { NAVIGATION_MENU, TEAMS_LIST } from "~/config/navigation";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Header from "~/components/navigation/Header";
// import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { AppRouting } from "./utils/routes";
import { currentToken } from "./services/auth.server";

// export const links: LinksFunction = () => [
//   ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
// ];

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader = async ({ request }) => {
  let token = await currentToken({ request });

  return {
    loggedIn: token ? true : false,
  };
};

export default function App() {
  const { loggedIn } = useLoaderData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(loggedIn ? true : false);
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const metaMaskAccountChanged = (accounts) => {
    if (accounts && Array.isArray(accounts) && accounts.length > 0) {
      console.log(accounts, AppRouting.API_LOGIN);

      fetcher.submit(
        {
          accounts,
        },
        { method: "post", action: AppRouting.API_LOGIN }
      );
    }
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.status) {
      setUserLoggedIn(true);
      navigate(AppRouting.ENDPOINTS);
    }
  }, [fetcher]);

  useEffect(() => {
    if (window) {
      // console.log("here");
      window.addEventListener("connectRMetaMaskCheck", (e) => {
        metaMaskAccountChanged(e.detail);
      });
      // window.ethereum.on("accountsChanged", metaMaskAccountChanged);
      // window.ethereum.on("disconnect", () => {
      //   setUserLoggedIn(false);

      //   fetcher.submit(AppRouting.API_LOGOUT);
      // });
    }

    return () => {
      window.removeEventListener("connectRMetaMaskCheck", (e) => {
        metaMaskAccountChanged(e.detail);
      });
    };
  }, []);

  return (
    <html lang="en" className="h-full bg-white">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Martel&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {userLoggedIn ? (
          <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-50 lg:hidden"
                onClose={setSidebarOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-900/80" />
                </Transition.Child>

                <div className="fixed inset-0 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                          <button
                            type="button"
                            className="-m-2.5 p-2.5"
                            onClick={() => setSidebarOpen(false)}
                          >
                            <span className="sr-only">Close sidebar</span>
                            <XMarkIcon
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </Transition.Child>
                      {/* Sidebar component, swap this element with another sidebar if you like */}
                      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center">
                          <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                          />
                        </div>
                        <nav className="flex flex-1 flex-col">
                          <ul className="flex flex-1 flex-col gap-y-7">
                            <li>
                              <ul className="-mx-2 space-y-1">
                                {NAVIGATION_MENU.map((item) => (
                                  <li key={item.name}>
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        item.current
                                          ? "bg-gray-50 text-indigo-600"
                                          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                      )}
                                    >
                                      <item.icon
                                        className={classNames(
                                          item.current
                                            ? "text-indigo-600"
                                            : "text-gray-400 group-hover:text-indigo-600",
                                          "h-6 w-6 shrink-0"
                                        )}
                                        aria-hidden="true"
                                      />
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </li>
                            <li>
                              <div className="text-xs font-semibold leading-6 text-gray-400">
                                Your teams
                              </div>
                              <ul className="-mx-2 mt-2 space-y-1">
                                {TEAMS_LIST.map((team) => (
                                  <li key={team.name}>
                                    <a
                                      href={team.href}
                                      className={classNames(
                                        team.current
                                          ? "bg-gray-50 text-indigo-600"
                                          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                      )}
                                    >
                                      <team.icon
                                        className={classNames(
                                          team.current
                                            ? "text-indigo-600"
                                            : "text-gray-400 group-hover:text-indigo-600",
                                          "h-6 w-6 shrink-0"
                                        )}
                                        aria-hidden="true"
                                      />
                                      {team.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </li>
                            <li className="mt-auto">
                              <a
                                href="#"
                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                              >
                                <Cog6ToothIcon
                                  className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                  aria-hidden="true"
                                />
                                Settings
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>
            <SidebarNavigation />

            <div className="lg:pl-72">
              <Header setSidebarOpen={setSidebarOpen} />

              <main className="py-10">
                <div className="px-4 sm:px-6 lg:px-8">
                  <Outlet />
                </div>
              </main>
            </div>
          </>
        ) : (
          <Outlet />
        )}

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
