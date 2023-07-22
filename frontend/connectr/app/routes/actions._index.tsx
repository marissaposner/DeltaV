import { Title } from "~/components/common/Title";
import { requireAuth } from "~/services/auth.server";

export const loader = async ({ request }) => {
  await requireAuth({ request });

  return null;
};
export default function Actions() {
  return (
    <>
      <Title title="Actions" className="mb-9" />
    </>
  );
}
