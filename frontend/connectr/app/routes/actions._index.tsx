import { useLoaderData } from "@remix-run/react";
import { format, parseISO } from "date-fns";
import { Title } from "~/components/common/Title";
import { getActions } from "~/services/api.server";
import { currentToken, requireAuth } from "~/services/auth.server";
import { classNames } from "~/utils/common";

export const loader = async ({ request }) => {
  await requireAuth({ request });

  const token = await currentToken({ request });

  return {
    actions: await getActions(token),
  };
};
export default function Actions() {
  const { actions } = useLoaderData();

  const statuses = {
    Running: "text-green-400 bg-green-400/10",
    Error: "text-rose-400 bg-rose-400/10",
  };

  console.log(actions);

  return (
    <>
      <Title title="Actions" className="mb-9" />

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
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {actions &&
                  actions.data?.actions &&
                  Array.isArray(actions.data.actions) &&
                  actions.data.actions.map((action) => (
                    <tr key={action.id} className="even:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        #{action.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {action.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {format(
                          parseISO(action.createdAt),
                          "EEE do MMM HH:mm:ss"
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                          <time
                            className="text-gray-400 sm:hidden"
                            dateTime={action.date}
                          >
                            {action.date}
                          </time>
                          <div
                            className={classNames(
                              statuses["Running"],
                              "flex-none rounded-full p-1"
                            )}
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-current" />
                          </div>
                          <div className="hidden text-gray-500 sm:block">
                            Running
                          </div>
                        </div>
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
