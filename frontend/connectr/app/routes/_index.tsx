import type { V2_MetaFunction } from "@remix-run/node";
import { Title } from "~/components/common/Title";
import { useNavigate } from "@remix-run/react";
import { AppRouting } from "~/utils/routes";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Connectr" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const navigate = useNavigate();

  return (
    <>
      <Title
        title="Endpoints"
        className="mb-9"
        ctaTitle="Create Endpoint"
        ctaAction={() => navigate(AppRouting.CREATE_ENDPOINT)}
      />
    </>
  );
}
