import type { V2_MetaFunction } from "@remix-run/node";
import { Title } from "~/components/common/Title";
import MultipleList from "~/components/forms/MultipleList";
import Select from "~/components/forms/Select";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Connectr" },
    { name: "description", content: "Welcome to Remix!" },
  ];
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
    { name: "Tether USD", value: "DAI" },
    { name: "Polygon", value: "MATIC" },
    { name: "Binance Coin", value: "BNB" },
    { name: "Wrapped Bitcoin", value: "WBTC" },
  ];

  return (
    <>
      <Title
        title="Create Endpoint"
        className="mb-9"
        ctaTitle="Publish Endpoint"
      />

      <div className="flex justify-between">
        <div className="bg-white shadow-standard px-12 py-9 basis-[32%]">
          <h2 className="mb-4 font-bold">Defi</h2>
          <Select options={defiOptions} className="mb-2" />
          <Select options={defiOptionsSecondary} className="mb-8" />
          <hr className="mb-5" />
          <h2 className="mb-4 font-bold">Tokens</h2>

          <MultipleList options={tokens} className="mb-8" />
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
          <MultipleList options={tokens} className="mb-8" />
        </div>
        <div className="bg-white shadow-standard px-12 py-9 basis-[32%]">
          <h2 className="mb-4 font-bold">Fields</h2>
          <MultipleList options={tokens} className="mb-8" />
        </div>
      </div>
    </>
  );
}
