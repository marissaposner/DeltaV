import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { Form, useFetcher, useSubmit } from "@remix-run/react";
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
  TokenFieldNames,
  TokenProductNames,
} from "~/models/products";
import { createEndpoint } from "~/services/api.server";
import { currentToken, requireAuth } from "~/services/auth.server";
import {
  classNames,
  convertObjectToNameValue,
  replacer,
  reviver,
} from "~/utils/common";
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
  const body = form.get("body");

  if (body) {
    const json = JSON.parse(body, reviver);

    if (json.products && json.name && json.products.size > 0) {
      let productsJSON = [];
      const token = await currentToken({ request });

      json.products.forEach((value, key) => {
        if (value && Array.isArray(value) && value.length > 0) {
          value.forEach((v, k) => {
            if (v.enabled) {
              productsJSON.push({
                fieldNameEnum: v.value,
                productNameEnum: key,
              });
            }
          });
        }
      });

      if (productsJSON.length > 0) {
        const response = await createEndpoint(
          json.contractAddress && json.contractAddress.length > 0
            ? json.contractAddress
            : token,
          JSON.stringify({
            name: json.name,
            fieldsToCreate: productsJSON,
          })
        );

        console.log(productsJSON);
        console.log(response);

        return {
          status: true,
        };
      }
    }
  }

  return {
    status: false,
  };
};

export default function CreateEndpoint() {
  const tokens = convertObjectToNameValue(TokenProductNames);
  const dex = convertObjectToNameValue(DexProductNames);
  const lending = convertObjectToNameValue(LendingProductNames);

  const submit = useSubmit();
  const abiFetcher = useFetcher();

  const [name, setName] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
  const [showCustomContract, setShowCustomContract] = useState(false);

  const [abi, setABI] = useState("");
  const [currentProductSelected, setCurrentProductSelected] = useState({});
  const [selectedProducts, setSelectedProducts] = useState(new Map());

  const [selectedTokens, setSelectedTokens] = useState(new Map());
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

  const loadAttributes = (value) => {
    setAttributes(selectedProducts.get(value));

    let newName = "";

    if (DexProductNames[value]) newName = DexProductNames[value];
    else if (LendingProductNames[value]) newName = LendingProductNames[value];
    else newName = TokenProductNames[value];

    setCurrentProductSelected({
      name: newName,
      value,
    });
  };

  const enableAttribute = (value, enabled) => {
    let newProducts = selectedProducts;

    if (newProducts.has(currentProductSelected.value)) {
      let newValues = newProducts.get(currentProductSelected.value);

      newValues.forEach((v, index) => {
        if (newValues[index].value == value)
          newValues[index].enabled = !enabled;
      });

      newProducts.set(currentProductSelected.value, newValues);
    }

    setSelectedProducts(newProducts);
  };

  useEffect(() => {
    const combinedMaps = new Map([
      ...dexProducts,
      ...lendingProducts,
      ...selectedTokens,
    ]);

    combinedMaps.forEach((value, key, map) => {
      let newValue = "";

      if (DexProductNames[key])
        newValue = convertObjectToNameValue(DexFieldNames);
      else if (LendingProductNames[key])
        newValue = convertObjectToNameValue(LendingFieldNames);
      else if (TokenProductNames[key])
        newValue = convertObjectToNameValue(TokenFieldNames);

      map.set(
        key,
        selectedProducts.has(key) && selectedProducts.get(key).length > 0
          ? selectedProducts.get(key)
          : newValue
      );
    });

    // console.log(combinedMaps);

    setSelectedProducts(combinedMaps);
  }, [dexProducts, lendingProducts, selectedTokens]);

  return (
    <Form method="post">
      <Title
        title="Create Endpoint"
        className="mb-9"
        ctaTitle="Publish Endpoint"
        ctaType="submit"
        ctaAction={(e) => {
          e.preventDefault();

          submit(
            {
              body: JSON.stringify(
                {
                  products: selectedProducts,
                  name,
                  // contractAddress,
                  // abi,
                },
                replacer
              ),
            },
            { method: "post" }
          );
        }}
      />
      <div className="bg-white shadow-standard px-12 py-9 mb-4">
        <div className="max-w-6xl">
          <div className="sm:col-span-3">
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
            clickIconEvent={loadAttributes}
            showIcon={true}
            hideValue={true}
          />
          <h2 className="mb-4 font-bold">Lending</h2>
          <MultipleList
            name="lending"
            options={lending}
            className="mb-8"
            clickEvent={setLendingProducts}
            clickIconEvent={loadAttributes}
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
            clickIconEvent={loadAttributes}
            showIcon={true}
            hideValue={false}
          />
          <hr className="mb-5" />
          <h2 className="mb-4 font-bold">Custom Contract</h2>

          <button
            onClick={(e) => {
              e.preventDefault();

              setShowCustomContract(!showCustomContract);
            }}
            type="button"
            className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          >
            {showCustomContract
              ? "Hide Custom Contract"
              : "Show Custom Contract"}
          </button>

          <div className={classNames(showCustomContract ? "block" : "hidden")}>
            <div className="sm:col-span-4 mt-4">
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

            <div className="sm:col-span-4 mt-4">
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
                  rows={15}
                  value={abi}
                />
              </div>
            </div>
          </div>
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
                  clickEvent={enableAttribute}
                  enable={item.enabled}
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
