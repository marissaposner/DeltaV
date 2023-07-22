import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { Form, useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Title } from "~/components/common/Title";
import InputText from "~/components/forms/InputText";
import InputTextArea from "~/components/forms/InputTextArea";
import MultipleList from "~/components/forms/MultipleList";
import Select from "~/components/forms/Select";
import { TokenProductNames } from "~/models/products";
import { createEndpoint } from "~/services/api.server";
import { currentToken, requireAuth } from "~/services/auth.server";
import { convertObjectToNameValue } from "~/utils/common";
import { AppRouting } from "~/utils/routes";
import LoaderSvg from "~/images/loader.svg";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "DeltaV" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }) => {
  await requireAuth({ request });

  return null;
};

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const name = form.get("name");
  const options = form.get("options");
  const attributes = form.get("attributes");
  const fields = form.get("fields");

  const token = await currentToken({ request });
  const response = await createEndpoint(token, {
    name,
    options,
    attributes,
    fields,
  });

  return {
    status: true,
  };
};

export default function CreateEndpoint() {
  const defiOptions = [{ id: 1, name: "Lending" }];
  const defiOptionsSecondary = [{ id: 1, name: "Staking" }];

  const tokens = convertObjectToNameValue(TokenProductNames);

  const abiFetcher = useFetcher();
  const [name, setName] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
  const [abi, setABI] = useState("");
  const [defiOption, setDefiOption] = useState(null);
  const [secondaryDefiOption, setSecondaryDefiOption] = useState(null);
  const [selectedTokens, setSelectedTokens] = useState(new Set());

  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  useEffect(() => {
    if (
      abiFetcher.state === "idle" &&
      abiFetcher.data &&
      abiFetcher.data.data &&
      abiFetcher.data.data.length > 1
    ) {
      setABI(abiFetcher.data.data);
    } else setABI("");
  }, [abiFetcher]);

  useEffect(() => {
    console.log("Name changed", name);
    console.log("ABI changed", abi);
    console.log("contractAddress changed", contractAddress);
    console.log("Checked items in selectedTokens:", Array.from(selectedTokens));

    console.log("Checked items in attributes:", Array.from(attributes));
    console.log(
      "Checked items in selectedAttributes:",
      Array.from(selectedAttributes)
    );

    console.log("Checked items in secondaryDefiOption:", defiOption);
    console.log("Checked items in defiOption:", secondaryDefiOption);
  }, [
    abi,
    name,
    contractAddress,
    selectedTokens,
    defiOption,
    secondaryDefiOption,
    selectedAttributes,
    attributes,
  ]);

  return (
    <Form method="post">
      <Title
        title="Create Endpoint"
        className="mb-9"
        ctaTitle="Publish Endpoint"
        ctaType="submit"
      />
      <div className="bg-white shadow-standard px-12 py-9 mb-4">
        <div className="flex justify-between max-w-6xl">
          <div className="sm:col-span-3 basis-1/2 mr-4">
            <label
              htmlFor="first-name"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <InputText
                placeholder="Friendly name"
                name="name"
                clickEvent={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-3 basis-1/2">
            <label
              htmlFor="contractAddress"
              className="block text-sm font-bold leading-6 text-gray-900"
            >
              Contract Address
            </label>
            <div className="mt-2">
              <InputText
                name="contractAddress"
                placeholder="Enter a contract address"
                clickEvent={(e) => {
                  if (e.target.value.length == 42)
                    abiFetcher.submit(
                      { account: e.target.value },
                      { method: "post", action: AppRouting.API_ABI }
                    );

                  setContractAddress(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-4 mt-4 max-w-6xl">
          <label
            htmlFor="ABI"
            className="text-sm font-bold leading-6 text-gray-900 flex items-center"
          >
            <span className="mr-2">ABI </span>
            {abiFetcher.state === "loading" ? (
              <span>
                <img src={LoaderSvg} width={20} alt="loader" />
              </span>
            ) : null}
          </label>
          <div className="mt-2">
            <InputTextArea
              name="abi"
              placeholder="Enter a contract address to pull the ABI automatically"
              readOnly={true}
              rows={8}
              value={abi}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="bg-white shadow-standard px-12 py-9 basis-[32%]">
          <h2 className="mb-4 font-bold">Defi</h2>
          <Select
            name="defiOptions"
            options={defiOptions}
            className="mb-2"
            clickEvent={setDefiOption}
          />
          <Select
            name="defiOptionsSecondary"
            options={defiOptionsSecondary}
            className="mb-8"
            clickEvent={setSecondaryDefiOption}
          />
          <hr className="mb-5" />
          <h2 className="mb-4 font-bold">Tokens</h2>

          <MultipleList
            options={tokens}
            name="tokens"
            className="mb-8"
            clickEvent={setSelectedTokens}
          />
          <hr className="mb-5" />
          <h2 className="mb-4 font-bold">Custom Contract</h2>

          <button
            type="button"
            className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          >
            Add Custom Contract
          </button>
        </div>
        <div className="bg-white shadow-standard px-12 py-9 basis-[32%]">
          <h2 className="mb-4 font-bold">Attributes</h2>
          <MultipleList
            name="attributes"
            options={attributes}
            className="mb-8"
            clickEvent={setAttributes}
          />
        </div>
        <div className="bg-white shadow-standard px-12 py-9 basis-[32%]">
          <h2 className="mb-4 font-bold">Fields</h2>
          <MultipleList
            name="fields"
            options={selectedAttributes}
            className="mb-8"
            clickEvent={setSelectedAttributes}
          />
        </div>
      </div>
    </Form>
  );
}
