import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { login } from "~/services/auth.server";
import { AppRouting } from "~/utils/routes";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();

  //TODO: submit the body data to the Heroku API
  if (body && body.get("accounts")) {
    const response = await login({ request, account: body.get("accounts") });

    console.log(response);

    if (response && response.status) {
      let options = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      options.headers = Object.assign(options.headers, response.headers);

      return new Response(JSON.stringify({ status: true }), options);
    }
  }

  return redirect(AppRouting.LOGIN);
}
