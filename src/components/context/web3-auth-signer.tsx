/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type SafeEventEmitterProvider } from "@web3auth/base";
import { createContext, useContext, useState } from "react";
import React from "react";
export interface Web3AuthSignerContext {
  web3AuthSigner?: SafeEventEmitterProvider;
  setWeb3AuthSigner: React.Dispatch<
    React.SetStateAction<SafeEventEmitterProvider | undefined>
  >;
  sessionKeyProvider: any;
  setSessionKeyProvider: any;

  accountAddress?: `0x${string}`;
  setAccountAddress: React.Dispatch<
    React.SetStateAction<`0x${string}` | undefined>
  >;

  // Correct variable name
}

export const Web3AuthSigner = createContext<Web3AuthSignerContext | null>(null);

export const useWeb3AuthSigner = () => {
  const signer = useContext(Web3AuthSigner);
  if (signer === null) {
    throw new Error(
      "useWeb3AuthSigner() can only be used inside of <Web3AuthSignerProvider />, " +
        "please declare it at a higher level."
    );
  }
  return signer;
};

export function Web3AuthSignerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [web3AuthSigner, setWeb3AuthSigner] = useState<
    SafeEventEmitterProvider | undefined
  >(undefined);
  const [accountAddress, setAccountAddress] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [sessionKeyProvider, setSessionKeyProvider] = useState<any>();

  // console.log("web3AuthSigner-->", web3AuthSigner);

  return (
    <Web3AuthSigner.Provider
      value={{
        web3AuthSigner,
        setWeb3AuthSigner,
        accountAddress,
        setAccountAddress,
        sessionKeyProvider,
        setSessionKeyProvider,
      }}
    >
      {children}
    </Web3AuthSigner.Provider>
  );
}
