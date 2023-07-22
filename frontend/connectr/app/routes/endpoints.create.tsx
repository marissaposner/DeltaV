import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { Title } from "~/components/common/Title";
import InputText from "~/components/forms/InputText";
import MultipleList from "~/components/forms/MultipleList";
import Select from "~/components/forms/Select";
import { createEndpoint, getAPIBaseURL } from "~/services/api.server";
import { currentToken, requireAuth } from "~/services/auth.server";

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
  const tokens = [
    { name: "Ethereum", value: "ETH" },
    { name: "USD Coin", value: "USDC" },
    { name: "Wrapped stETH", value: "WstETH" },
    { name: "Rocket Pool ETH", value: "rETH" },
    { name: "Dai", value: "DAI" },
    { name: "Tether USD", value: "USDT" },
    { name: "Polygon", value: "MATIC" },
    { name: "Binance Coin", value: "BNB" },
    { name: "Wrapped Bitcoin", value: "WBTC" },
  ];
  const attributes = [];
  const fields = [];

  const [name, setName] = useState(null);
  const [defiOption, setDefiOption] = useState(null);
  const [secondaryDefiOption, setSecondaryDefiOption] = useState(null);
  const [selectedTokens, setSelectedTokens] = useState(new Set());
  const [selectedAttributes, setSelectedAttributes] = useState(new Set());
  const [selectedFields, setSelectedFields] = useState(new Set());

  useEffect(() => {
    console.log("Name changed", name);
    console.log("Checked items in selectedTokens:", Array.from(selectedTokens));
    console.log(
      "Checked items in selectedAttributes:",
      Array.from(selectedAttributes)
    );
    console.log("Checked items in selectedFields:", Array.from(selectedFields));
    console.log("Checked items in secondaryDefiOption:", defiOption);
    console.log("Checked items in defiOption:", secondaryDefiOption);
  }, [
    name,
    selectedTokens,
    defiOption,
    secondaryDefiOption,
    selectedAttributes,
    selectedFields,
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
        <h2 className="mb-4 font-bold">Name</h2>
        <InputText
          placeholder="Friendly name"
          name="name"
          clickEvent={(e) => setName(e.target.value)}
        />
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
            clickEvent={setSelectedAttributes}
          />
        </div>
        <div className="bg-white shadow-standard px-12 py-9 basis-[32%]">
          <h2 className="mb-4 font-bold">Fields</h2>
          <MultipleList
            name="fields"
            options={fields}
            className="mb-8"
            clickEvent={setSelectedFields}
          />
        </div>
      </div>
    </Form>
  );
}
