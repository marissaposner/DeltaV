import { redirect, type V2_MetaFunction } from "@remix-run/node";
import { Title } from "~/components/common/Title";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { requireAuth } from "~/services/auth.server";
import InputTextArea from "~/components/forms/InputTextArea";
import { AppRouting } from "~/utils/routes";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "DeltaV" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request, params }) => {
  await requireAuth({ request });

  const id = params.id;

  if (!id) return redirect("/");

  return {
    id,
  };
};

export default function EndpointsView() {
  const { id } = useLoaderData();
  const navigate = useNavigate();

  const value = JSON.stringify([
    {
      block: "10003",
      timestamp: "2023-07-23 01:47:22.518941+00",
      values: {
        wbtc_price: "29500",
        aave_tvl_weth: "242424",
        uniswap_tvl_usdc_wbtc: "1000",
      },
    },
    {
      block: "10004",
      timestamp: "2023-07-23 01:47:22.518941+00",
      values: {
        wbtc_price: "29000",
        aave_tvl_weth: "242494",
        uniswap_tvl_usdc_wbtc: "1000",
      },
    },
    {
      block: "10005",
      timestamp: "2023-07-23 01:47:22.518941+00",
      values: {
        wbtc_price: "29000",
        aave_tvl_weth: "442424",
        uniswap_tvl_usdc_wbtc: "l",
      },
    },
  ]);

  return (
    <>
      <Title
        title="Endpoint Data"
        className="mb-9"
        ctaTitle="Back to Endpoints"
        ctaAction={(e) => {
          e.preventDefault();
          navigate(AppRouting.ENDPOINTS);
        }}
      />

      <div className="bg-white shadow-standard px-12 py-9">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Action Payload Data
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 mb-4">ID #{id}</p>
        <InputTextArea
          name="payload"
          placeholder="Payload data"
          rows={20}
          readOnly={true}
          value={value}
        />
      </div>
    </>
  );
}
