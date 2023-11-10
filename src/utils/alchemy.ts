import { Network, Alchemy } from "alchemy-sdk";

export const alchemy = new Alchemy({
  apiKey: import.meta.env.VITE_API_APP_ALCHEMY_KEY,
  network: Network.ETH_MAINNET,
});

///MATIC_MUMBAI
//import { Network, Alchemy } from "alchemy-sdk"

//import { env } from "~/env.mjs"

//export const alchemy = new Alchemy({
//  apiKey: env.NEXT_PUBLIC_APP_ALCHEMY_KEY,
//  network: Network.MATIC_MUMBAI,
//})
