import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import { logout, requireAuth } from "~/services/auth.server";
import { AppRouting } from "~/utils/routes";

export async function action({ request }: ActionArgs) {
  await requireAuth({ request });
  await logout({ request });

  return redirect(AppRouting.LOGIN);
}
