import type { V2_MetaFunction } from "@remix-run/node";
import { Title } from "~/components/common/Title";
import { useNavigate } from "@remix-run/react";
import { AppRouting } from "~/utils/routes";
import { classNames, getColours, getRandomArbitrary } from "~/utils/common";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Connectr" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function EndpointsIndex() {
  const navigate = useNavigate();

  const statuses = {
    Running: "text-green-400 bg-green-400/10",
    Error: "text-rose-400 bg-rose-400/10",
  };

  const colours = getColours();

  const endpoints = [
    {
      id: 1,
      name: "Lindsay Walton",
      title: "Front-end Developer",
      sources: [
        "Ethereum",
        "CoinGecko API",
        "Ethereum",
        "CoinGecko API",
        "Ethereum",
      ],
      status: "Running",
      date: "25/04/2023",
    },
  ];

  return (
    <>
      <Title
        title="Endpoints"
        className="mb-9"
        ctaTitle="Create Endpoint"
        ctaAction={() => navigate(AppRouting.CREATE_ENDPOINT)}
      />

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date &amp; Time
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Data Sources
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {endpoints.map((endpoint) => (
                  <tr key={endpoint.id} className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      #{endpoint.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {endpoint.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {endpoint.date}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 flex flex-wrap max-w-[285px]">
                      {endpoint.sources.map((source, index) => (
                        <span
                          key={index}
                          className={classNames(
                            colours[index]
                              ? colours[index]
                              : colours[getRandomArbitrary(0, colours.length)],
                            "mr-1 mb-1 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-green-600/20"
                          )}
                        >
                          {source}
                        </span>
                      ))}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                        <time
                          className="text-gray-400 sm:hidden"
                          dateTime={endpoint.date}
                        >
                          {endpoint.date}
                        </time>
                        <div
                          className={classNames(
                            statuses[endpoint.status],
                            "flex-none rounded-full p-1"
                          )}
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-current" />
                        </div>
                        <div className="hidden text-gray-500 sm:block">
                          {endpoint.status}
                        </div>
                      </div>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-3">
                      <button
                        onClick={() =>
                          navigate(
                            AppRouting.CREATE_ACTIONS + "/" + endpoint.id
                          )
                        }
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                      >
                        Create Action
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
