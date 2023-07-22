import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { Form, useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Title } from "~/components/common/Title";
import InputText from "~/components/forms/InputText";
import InputTextArea from "~/components/forms/InputTextArea";
import MultipleList from "~/components/forms/MultipleList";

import {
  DexFieldNames,
  DexProductNames,
  LendingFieldNames,
  LendingProductNames,
  TokenProductNames,
} from "~/models/products";
import { createEndpoint } from "~/services/api.server";
import { currentToken, requireAuth } from "~/services/auth.server";
import { convertObjectToNameValue } from "~/utils/common";
import { AppRouting } from "~/utils/routes";
import LoaderSvg from "~/images/loader.svg";
import SwitchGroupButton from "~/components/switches/SwitchGroupButton";

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
  const tokens = convertObjectToNameValue(TokenProductNames);
  const dex = convertObjectToNameValue(DexProductNames);
  const lending = convertObjectToNameValue(LendingProductNames);

  const abiFetcher = useFetcher();
  const [name, setName] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
  const [abi, setABI] = useState("");
  const [currentProductSelected, setCurrentProductSelected] = useState({});
  const [selectedTokens, setSelectedTokens] = useState(new Set());
  const [selectedProducts, setSelectedProducts] = useState(new Map());
  const [dexProducts, setDexProducts] = useState(new Map());
  const [lendingProducts, setLendingProducts] = useState(new Map());

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

  const loadDexAttributes = (value) => {
    const result = convertObjectToNameValue(DexFieldNames);

    setAttributes(result);
    setCurrentProductSelected({
      name: DexProductNames[value],
      value,
    });

    console.log(
      DexProductNames[value],
      value,
      currentProductSelected,
      selectedProducts
    );
  };

  const loadLendingAttributes = (value) => {
    const result = convertObjectToNameValue(LendingFieldNames);

    setAttributes(result);
    setCurrentProductSelected({
      name: LendingProductNames[value],
      value,
    });
  };

  const addAttributeToProduct = (value) => {
    console.log(value, currentProductSelected, selectedProducts);

    if (selectedProducts.has(currentProductSelected.value)) {
      let newAttributes = selectedProducts.get(currentProductSelected.value);

      //check for value, if exists remove it, otherwise add it
      const check = newAttributes.filter((filterValue) => {
        return filterValue == value;
      });

      if (check.length == 0) newAttributes.push(value);
      else
        newAttributes = newAttributes.filter((filterValue) => {
          return filterValue != value;
        });

      selectedProducts.set(currentProductSelected.value, [
        ...new Set(newAttributes),
      ]);
    }
  };

  useEffect(() => {
    setSelectedProducts(new Map([...dexProducts, ...lendingProducts]));
  }, [dexProducts, lendingProducts]);

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
            {abiFetcher.state != "idle" ? (
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
          <h2 className="mb-4 font-bold">DEX</h2>
          <MultipleList
            name="dex"
            options={dex}
            className="mb-4"
            clickEvent={setDexProducts}
            clickIconEvent={loadDexAttributes}
            showIcon={true}
            hideValue={true}
          />
          <h2 className="mb-4 font-bold">Lending</h2>
          <MultipleList
            name="lending"
            options={lending}
            className="mb-8"
            clickEvent={setLendingProducts}
            clickIconEvent={loadLendingAttributes}
            showIcon={true}
            hideValue={true}
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
          <h2 className="mb-4 font-bold">
            Attributes {currentProductSelected.name}
          </h2>
          {attributes && Array.isArray(attributes)
            ? attributes.map((item, index) => (
                <SwitchGroupButton
                  item={item}
                  key={
                    currentProductSelected.value +
                    "-" +
                    item.value +
                    "-" +
                    index
                  }
                  className="mb-4"
                  clickEvent={addAttributeToProduct}
                  enable={
                    selectedProducts.has(currentProductSelected.value) &&
                    selectedProducts
                      .get(currentProductSelected.value)
                      .includes(item.value)
                      ? true
                      : false
                  }
                />
              ))
            : null}
        </div>
        <div className="bg-white shadow-standard px-12 py-9 basis-[32%]">
          <h2 className="mb-4 font-bold">Selected Attributes</h2>
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
