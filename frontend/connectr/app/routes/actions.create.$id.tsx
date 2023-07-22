import { useEffect, useState } from "react";
import { Title } from "~/components/common/Title";
import InputText from "~/components/forms/InputText";
import Select from "~/components/forms/Select";
import { requireAuth } from "~/services/auth.server";

export const loader = async ({ request }) => {
  await requireAuth({ request });

  return null;
};

export default function CreateActions() {
  const [actionName, setActionName] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [selectedIfCondition, setSelectedIfCondition] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState(null);

  const optionsEndpoint = [{ id: 1, name: "Endpoint XYZ" }];
  const optionsIfConditions = [{ id: 1, name: "Condition X" }];
  const optionsActions = [{ id: 1, name: "Action X" }];
  const optionsOperators = [{ id: 1, name: "Greater Than (>)" }];

  useEffect(() => {
    console.log("Text in actionName:", actionName);
    console.log("Selected selectedEndpoint:", selectedEndpoint);
    console.log("Selected selectedIfCondition:", selectedIfCondition);
    console.log("Selected selectedAction:", selectedAction);
    console.log("Selected selectedOperator:", selectedOperator);
  }, [
    actionName,
    selectedEndpoint,
    selectedIfCondition,
    selectedAction,
    selectedOperator,
  ]);

  return (
    <>
      <Title title="Create Action" className="mb-9" ctaTitle="Save Action" />

      <div className="bg-white shadow-standard px-12 py-9">
        <form>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Action Conditions
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Select the conditions you would like to take an action on.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-w-3xl">
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Action Name
              </label>
              <div className="mt-2">
                <InputText
                  name="name"
                  clickEvent={setActionName}
                  placeholder="Name of action"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                For Endpoint with id
              </label>
              <div className="mt-2">
                <Select
                  options={optionsEndpoint}
                  clickEvent={setSelectedEndpoint}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="field"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                If such field
              </label>
              <div className="mt-2">
                <Select
                  options={optionsIfConditions}
                  clickEvent={setSelectedIfCondition}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="field"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                is
              </label>
              <div className="flex justify-between">
                <div className="sm:col-span-3 basis-1/2 mr-1">
                  <label
                    htmlFor="first-name"
                    className="block text-sm leading-6 text-gray-900"
                  >
                    Operator
                  </label>
                  <div className="mt-2">
                    <Select
                      options={optionsOperators}
                      clickEvent={setSelectedOperator}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 basis-1/2">
                  <label
                    htmlFor="last-name"
                    className="block text-sm leading-6 text-gray-900"
                  >
                    Value
                  </label>
                  <div className="mt-2">
                    <InputText
                      inputType="number"
                      name="conditionValue"
                      placeholder="Input a number"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="field"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Then do
              </label>
              <div className="mt-2">
                <Select
                  options={optionsActions}
                  clickEvent={setSelectedAction}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
