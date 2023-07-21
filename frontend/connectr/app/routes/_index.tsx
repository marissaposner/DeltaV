import { redirect } from "@remix-run/node";
import { AppRouting } from "~/utils/routes";

export const loader = async () => {
  return redirect(AppRouting.ENDPOINTS);
};
