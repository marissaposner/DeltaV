import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import { logout, requireAuth } from "~/services/auth.server";

export async function loader({ request }: LoaderArgs) {
  await requireAuth({ request });
  return await logout({ request });
}
