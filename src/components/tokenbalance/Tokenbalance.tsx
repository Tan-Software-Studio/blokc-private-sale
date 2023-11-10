/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react/jsx-no-undef */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/restrict-template-expressions */

/* eslint-disable @typescript-eslint/no-explicit-any */
//import { EvmChain } from "@moralisweb3/common-evm-utils"
import axios, { type AxiosRequestConfig } from "axios";
import clipboardCopy from "clipboard-copy";
import { Loader2, LucideCopy } from "lucide-react";
//import Moralis from "moralis"

import React, { useEffect, useRef, useState } from "react";
import { MdArrowBack, MdDownloadDone } from "react-icons/md";
import { useWeb3AuthSigner } from "../context/web3-auth-signer";

interface confi {
  method: string;
  url: string;
  headers: {
    "Content-Type": string;
  };
  data: string;
}
// Replace with the correct path
interface TokenBalanceData {
  data: TokenBalanceData;
  jsonrpc: string;
  id: number;
  result: {
    address: string;
    tokenBalances: {
      contractAddress: string;
      tokenBalance: number;
    }[];
  };
}

const Tokenbalance = () => {
  const [tokens, setTokens] = useState<any[]>([]);

  const { accountAddress } = useWeb3AuthSigner();
  //  const address = "0x23874afc3E1992215f08d16ea7490DD8bE56b518"; // Replace with your desired address
  const address = accountAddress;
  //  const address = accountwallet
  // Alchemy URL with your API key
  const baseURL =
    "https://eth-mainnet.g.alchemy.com/v2/vBwEupHTfqXRo7CLn6GOVIy6g2oZ8i5H"; // Replace with your Alchemy API key

  // Data for making the request to query token balances
  const data = {
    jsonrpc: "2.0",
    method: "alchemy_getTokenBalances",
    headers: {
      "Content-Type": "application/json",
    },
    params: [`${address}`],
    id: 42,
  };

  // Config object for making a request with axios
  const config: confi = {
    method: "post",
    url: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  async function getTokens() {
    let response: TokenBalanceData = await axios(config);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    response = response.data;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const balances = response.result;
    //console.log("balances", balances)
    const tokensData: { name: any; balance: string; logo: string }[] = [];

    const contractAddresses = balances.tokenBalances
      .filter((token) => token.tokenBalance !== 0)
      .map((token) => token.contractAddress);

    const metadataPromises = contractAddresses.map(async (contractAddress) => {
      const options: AxiosRequestConfig = {
        method: "POST",
        url: baseURL,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        data: {
          id: 1,
          jsonrpc: "2.0",
          method: "alchemy_getTokenMetadata",
          params: [contractAddress],
        },
      };

      return axios.request(options);
    });

    // Wait for all metadata requests to complete
    const metadataResponses = await Promise.all(metadataPromises);

    metadataResponses.forEach((metadataResponse, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const balance = balances?.tokenBalances[index]?.tokenBalance;

      if (typeof balance !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const metadata = metadataResponse.data;

        if (metadata?.result) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const balanceValue = balance / Math.pow(10, metadata.result.decimals);
          const formattedBalance = balanceValue.toFixed(5);

          tokensData.push({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            name: metadata.result.name,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            logo: metadata.result.logo,
            balance: `${formattedBalance}`,
          });
        }
      }
    });

    return tokensData;
  }

  useEffect(() => {
    async function fetchData() {
      const tokenData = await getTokens();
      setTokens(tokenData);
    }

    void fetchData();
  }, []);

  return (
    <>
      <div className=" scrollspy-example">
        <div className="text-center overflow-auto p-3">
          {tokens.map((token, index) => (
            <div
              key={index}
              className="d-flex flex-row  justify-content-center gap-3"
            >
              {/*{`${index + 1}. ${token.name}: ${token.balance}`}*/}

              <div className="mb-5 ">
                <img
                  src={`${token.logo}`}
                  alt={`${token.name}`}
                  height={40}
                  width={40}
                />
              </div>
              <div className="">
                {/*<p className="text-lg font-medium">{`${token.logo}.`}</p>*/}
                <p className="">{token.name}</p>
                <p className="">{token.balance}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tokenbalance;
