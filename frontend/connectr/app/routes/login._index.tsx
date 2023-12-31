/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { MetaMaskSDK } from "@metamask/sdk";
import MetaMaskImage from "~/images/metamask.svg";

export default function Login() {
  const connectWallet = (e) => {
    const MMSDK = new MetaMaskSDK({
      // injectProvider: true,
      // communicationLayerPreference: "webrtc",
      dappMetadata: {
        name: "DeltaV",
        url: "https://deltav.io",
      },
    });

    const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum
    ethereum
      .request({ method: "eth_requestAccounts", params: [] })
      .then((response) => {
        console.log("Promise done");
        window.dispatchEvent(
          new CustomEvent("connectRMetaMaskCheck", { detail: response })
        );
      });

    e.preventDefault();
  };

  return (
    <div className="flex min-h-full flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <p className="font-martel text-4xl">DeltaV 🚀</p>
            <div className="flex justify-between items-center mt-8">
              <img src={MetaMaskImage} width={70} height={100} alt="MetaMask" />
              <div>
                <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Connect MetaMask Wallet
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  You don't own a MetaMask Wallet?{" "}
                  <a
                    href="https://metamask.io/download/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Create one
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div>
              <form action="#" method="post">
                <div>
                  <button
                    onClick={connectWallet}
                    type="submit"
                    className="flex w-full h-14 justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Connect Wallet
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover object-top"
          src="https://images.unsplash.com/photo-1614642240262-a452c2c11724?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1311&q=80"
          alt=""
        />
      </div>
    </div>
  );
}
