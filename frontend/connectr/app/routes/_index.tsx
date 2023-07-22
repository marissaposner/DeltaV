import { redirect } from "@remix-run/node";
import { requireAuth } from "~/services/auth.server";
import { AppRouting } from "~/utils/routes";

export const loader = async ({ request }) => {
  await requireAuth({ request });

  return redirect(AppRouting.ENDPOINTS);
};
