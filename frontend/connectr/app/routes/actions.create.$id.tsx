import { Form, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Title } from "~/components/common/Title";
import InputText from "~/components/forms/InputText";
import Select from "~/components/forms/Select";
import { getEndpoints } from "~/services/api.server";
import { currentToken, requireAuth } from "~/services/auth.server";

export const loader = async ({ request }) => {
  await requireAuth({ request });

  const token = await currentToken({ request });

  return {
    endpoints: await getEndpoints(token),
  };
};

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  // const body = form.get("body");

  // if (body) {
  //   const json = JSON.parse(body, reviver);

  //   if (json.products && json.name && json.products.size > 0) {
  //     let productsJSON = [];
  //     const token = await currentToken({ request });

  //     json.products.forEach((value, key) => {
  //       if (value && Array.isArray(value) && value.length > 0) {
  //         value.forEach((v, k) => {
  //           if (v.enabled) {
  //             productsJSON.push({
  //               fieldNameEnum: v.value,
  //               productNameEnum: key,
  //             });
  //           }
  //         });
  //       }
  //     });

  //     if (productsJSON.length > 0) {
  //       const response = await createEndpoint(
  //         json.contractAddress && json.contractAddress.length > 0
  //           ? json.contractAddress
  //           : token,
  //         JSON.stringify({
  //           name: json.name,
  //           fieldsToCreate: productsJSON,
  //         })
  //       );

  //       console.log(productsJSON);
  //       console.log(response);

  //       return {
  //         status: true,
  //       };
  //     }
  //   }
  // }

  return {
    status: false,
  };
};

export default function CreateActions() {
  const [actionName, setActionName] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [selectedIfCondition, setSelectedIfCondition] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState(null);

  const optionsIfConditions = [{ id: 1, name: "Condition X" }];
  const optionsActions = [{ id: 1, name: "Action X" }];
  const optionsOperators = [{ id: 1, name: "Greater Than (>)" }];

  const { endpoints } = useLoaderData();

  return (
    <>
      <Form method="post">
        <Title
          title="Create Action"
          className="mb-9"
          ctaTitle="Save Action"
          ctaType="submit"
        />

        <div className="bg-white shadow-standard px-12 py-9">
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
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contract Address
              </label>
              <div className="mt-2">
                <InputText
                  name="contractAddress"
                  clickEvent={setActionName}
                  placeholder="Contract address"
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
                  name="endpoint"
                  options={endpoints.data?.endpoints}
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
                      name="operator"
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
                  name="action"
                  options={optionsActions}
                  clickEvent={setSelectedAction}
                />
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}
