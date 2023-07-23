import { redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Title } from "~/components/common/Title";
import InputText from "~/components/forms/InputText";
import Select from "~/components/forms/Select";
import { ActionFieldEnums, OperatorFieldEnums } from "~/models/misc";
import { ActionTypeEnum, TokenProductNames } from "~/models/products";
import {
  createAction,
  getEndpointFields,
  getEndpoints,
} from "~/services/api.server";
import { currentToken, requireAuth } from "~/services/auth.server";
import {
  classNames,
  convertObjectToIdName,
  fieldsToSelect,
} from "~/utils/common";

export const loader = async ({ request, params }) => {
  await requireAuth({ request });

  const id = params.id;

  if (!id) return redirect("/");

  const token = await currentToken({ request });

  return {
    id,
    endpoints: await getEndpoints(token),
    fields: await getEndpointFields(token, id),
  };
};

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const name = form.get("name");
  const address = form.get("address");
  const field = form.get("field");
  const operator = form.get("operator");
  const threshold = form.get("threshold");
  const actionType = form.get("actionType");
  const endpoint = form.get("endpoint");

  if (
    name &&
    address &&
    field &&
    operator &&
    threshold &&
    actionType &&
    endpoint
  ) {
    let data = {
      name,
      address,
      field,
      operator,
      threshold,
      actionType,
      fieldNameEnum: field,
      actionPayload: "",
    };

    if (actionType == ActionFieldEnums.SWAP) {
      const tokenIn = form.get("tokenIn");
      const tokenOut = form.get("tokenOut");
      const amount = form.get("amount");

      if (tokenIn && tokenOut && amount) {
        data.actionPayload = JSON.stringify({
          tokenIn,
          tokenOut,
          amount,
        });
      }
    } else if (actionType == ActionFieldEnums.TRANSFER) {
      const token = form.get("token");
      const amount = form.get("amount");

      if (token && amount) {
        data.actionPayload = JSON.stringify({
          token,
          amount,
        });
      }
    }

    const token = await currentToken({ request });
    const response = await createAction(token, JSON.stringify(data), endpoint);

    console.log(response);

    return {
      status: true,
    };
  }

  return {
    status: false,
  };
};

export default function CreateActions() {
  // const [actionName, setActionName] = useState(null);
  // const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [selectedIfCondition, setSelectedIfCondition] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState(null);

  const { endpoints, fields, id } = useLoaderData();

  return (
    <>
      <Form method="post">
        <Title
          title="Create Action"
          className="mb-9"
          ctaTitle="Save Action"
          ctaType="submit"
        />

        <input type="hidden" value={id} name="endpoint" />

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
                  // clickEvent={setActionName}
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
                  name="address"
                  // clickEvent={setActionName}
                  placeholder="Contract address"
                />
              </div>
            </div>

            {/* <div className="sm:col-span-4">
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
            </div> */}

            <div className="sm:col-span-4">
              <label
                htmlFor="field"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                If such field
              </label>
              <div className="mt-2">
                <Select
                  name="field"
                  options={fieldsToSelect(fields.data.endpointFields)}
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
                      options={convertObjectToIdName(OperatorFieldEnums)}
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
                      name="threshold"
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
                  name="actionType"
                  options={convertObjectToIdName(ActionFieldEnums)}
                  clickEvent={setSelectedAction}
                />
              </div>
            </div>

            <div
              className={classNames(
                "sm:col-span-4",
                selectedAction && selectedAction.id == ActionTypeEnum.TRANSFER
                  ? "block"
                  : "hidden"
              )}
            >
              <div className="flex justify-between">
                <div className="sm:col-span-3 basis-1/2 mr-1">
                  <label
                    htmlFor="token"
                    className="block text-sm leading-6 text-gray-900"
                  >
                    Token
                  </label>
                  <div className="mt-2">
                    <Select
                      name="token"
                      options={convertObjectToIdName(TokenProductNames)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 basis-1/2">
                  <label
                    htmlFor="last-name"
                    className="block text-sm leading-6 text-gray-900"
                  >
                    Amount
                  </label>
                  <div className="mt-2">
                    <InputText
                      inputType="number"
                      name="amount"
                      placeholder="Input an amount"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={classNames(
                "sm:col-span-4",
                selectedAction && selectedAction.id == ActionTypeEnum.SWAP
                  ? "block"
                  : "hidden"
              )}
            >
              <div className="flex justify-between mb-4">
                <div className="sm:col-span-3 basis-1/2 mr-1">
                  <label
                    htmlFor="token"
                    className="block text-sm leading-6 text-gray-900"
                  >
                    Token In
                  </label>
                  <div className="mt-2">
                    <Select
                      name="tokenIn"
                      options={convertObjectToIdName(TokenProductNames)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 basis-1/2">
                  <label
                    htmlFor="last-name"
                    className="block text-sm leading-6 text-gray-900"
                  >
                    Token Out
                  </label>
                  <div className="mt-2">
                    <Select
                      name="tokenOut"
                      options={convertObjectToIdName(TokenProductNames)}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="last-name"
                  className="block text-sm leading-6 text-gray-900"
                >
                  Amount
                </label>
                <div className="mt-2">
                  <InputText
                    inputType="number"
                    name="amount"
                    placeholder="Input an amount"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}
