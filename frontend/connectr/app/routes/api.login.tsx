import type { ActionArgs } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import { login } from "~/services/auth.server";
import { AppRouting } from "~/utils/routes";
import { IBundler, Bundler } from "@biconomy/bundler";
import {
  BiconomySmartAccount,
  BiconomySmartAccountConfig,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from "@biconomy/account";
import { Wallet, providers, ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";

async function createAccount() {
  const provider = new providers.JsonRpcProvider(
    "https://rpc.ankr.com/polygon_mumbai"
  );
  const wallet = new Wallet(process.env.PRIVATE_KEY || "", provider);

  const bundler: IBundler = new Bundler({
    bundlerUrl: "https://bundler.biconomy.io/api/v2/80001/abc",
    chainId: ChainId.POLYGON_MUMBAI,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  });

  const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
    signer: wallet,
    chainId: ChainId.POLYGON_MUMBAI,
    bundler: bundler,
  };

  let biconomySmartAccount = new BiconomySmartAccount(
    biconomySmartAccountConfig
  );
  biconomySmartAccount = await biconomySmartAccount.init();
  console.log("owner: ", biconomySmartAccount.owner);
  console.log("address: ", await biconomySmartAccount.getSmartAccountAddress());
  return biconomySmartAccount;
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();

  //TODO: submit the body data to the Heroku API
  if (body && body.get("accounts")) {
    const response = await login({ request, account: body.get("accounts") });

    createAccount();

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
