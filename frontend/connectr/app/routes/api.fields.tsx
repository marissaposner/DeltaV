import type { LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
// import { redirect } from "@remix-run/node"; // or cloudflare/deno
import { getEndpointFields } from "~/services/api.server";
import { currentToken, requireAuth } from "~/services/auth.server";
export async function loader({ request }: LoaderArgs) {
  await requireAuth({ request });

  const url = new URL(request.url);
  const urlParams = new URLSearchParams(url.search);
  const endpoint = urlParams.get("endpoint");

  if (endpoint && endpoint.length > 0) {
    const token = await currentToken({ request });
    const sources = await getEndpointFields(token, endpoint);

    return {
      sources:
        sources && sources.data.endpointFields
          ? sources.data.endpointFields
          : [],
    };
  }

  return {};
}
