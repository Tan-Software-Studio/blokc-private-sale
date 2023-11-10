import { useQuery } from "@tanstack/react-query";

import { formatEther } from "viem";
import { useWeb3AuthSigner } from "../context/web3-auth-signer";
import { alchemy } from "../../utils/alchemy";
const WETH_TOKEN_ADDRESS = "0xc1b1d35BCb4145939E0b51663A9CdCb05EE1777A";

export default function useWallet() {
  const { accountAddress } = useWeb3AuthSigner();

  const data = useQuery({
    queryKey: ["wallet"],
    queryFn: async () => {
      let address = accountAddress;

      if (address) {
        const contract = "0x232e48C3Fcc31Cf977573F1e5D77933D63F4C4cA" as never;
        //const address1 = "0x251286FEB640dd7f39Cebf1E9cB650C7E72d58B2"

        const [rawMaticBalance, tokenBalances] = await Promise.all([
          alchemy.core.getBalance(address),
          alchemy.core.getTokensForOwner(address, contract),
        ]);

        const rawWethBalance =
          tokenBalances.tokens.find(
            (token) => token.contractAddress === WETH_TOKEN_ADDRESS
          )?.balance ?? "0";

        // Parsed balances
        const maticBalance = +formatEther(rawMaticBalance.toBigInt());
        const wethBalance = +rawWethBalance;
        const totalBalance = maticBalance + wethBalance * 131.62;
        // console.log("totalBalance", totalBalance);

        return {
          address,
          maticBalance,
          wethBalance,
          totalBalance,
        };
      } else {
        // Handle the case when address is undefined
        console.error("Address is undefined");
        // You should return some default values or handle this case accordingly
        return {
          address: "",
          maticBalance: 0,
          wethBalance: 0,
          totalBalance: 0,
        };
      }
    },
  });

  return data;
}
