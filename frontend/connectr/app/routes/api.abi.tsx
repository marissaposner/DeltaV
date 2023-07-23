import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import { fetchEthABI } from "~/services/api.server";
import { requireAuth } from "~/services/auth.server";
import { AppRouting } from "~/utils/routes";

export async function action({ request }: ActionArgs) {
  await requireAuth({ request });

  const body = await request.formData();

  if (body && body.get("account") && body.get("account")?.length > 0) {
    const response = await fetchEthABI(body.get("account"));

    if (response && response.status) {
      return {
        data: response.data ? response.data.result : "",
      };
    }

    return {};
  }

  return redirect(AppRouting.LOGIN);
}
