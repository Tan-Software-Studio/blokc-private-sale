import { type SafeEventEmitterProvider } from "@web3auth/base";
import { type BigNumber } from "ethers";
import React, {
  createContext,
  useState,
  type ReactNode,
  type SetStateAction,
  type Key,
} from "react";

export interface Wallet1 {
  email: string;
  name: string;
  profileImage: string;
  verifier: string;
  verifierId: string;
  typeOfLogin: string;
  accessToken: string;
  idToken: string;
  state: {
    instanceId: string;
    verifier: string;
    typeOfLogin: string;
    redirectToOpener: boolean;
  };
  token_type: string;
  expires_in: string;
  scope: string;
  authuser: string;
  prompt: string;
  version_info: string;
}

export interface DataItem {
  decimals: SetStateAction<number | undefined>;
  address: `0x${string}` | undefined;
  id: Key | null | undefined;
  name: string;
  symbol: string;
  logoURI: string;
}

export interface WalletContextType {
  userinfo: Wallet1 | null;
  setUserinfo: React.Dispatch<React.SetStateAction<Wallet1 | null>>;

  setUser: (user: Wallet1 | null) => void;

  rgardener?: boolean | undefined;
  setRgardener: React.Dispatch<React.SetStateAction<boolean | undefined>>;

  alltoken?: DataItem[];
  setAlltoken: React.Dispatch<React.SetStateAction<DataItem[]>>;

  sessionKeyProvider?: any | undefined;
  setSessionKeyProvider: React.Dispatch<React.SetStateAction<any>>;

  opengarden?: SafeEventEmitterProvider | undefined | boolean;
  setOpengarden: React.Dispatch<
    React.SetStateAction<SafeEventEmitterProvider | undefined | boolean>
  >;
}

interface WalletProviderProps {
  children: ReactNode;
}
export const WalletContext = createContext<
  WalletContextType | Wallet1 | DataItem[] | undefined
>(undefined);

export function WalletProvider({ children }: WalletProviderProps) {
  const [userinfo, setUserinfo] = useState<Wallet1 | null>(null);
  const [rgardener, setRgardener] = useState<boolean | undefined>(undefined);
  const [sessionKeyProvider, setSessionKeyProvider] = useState<any | undefined>(
    undefined
  );
  const [opengarden, setOpengarden] = useState<
    SafeEventEmitterProvider | undefined | boolean
  >(undefined);
  // Add the setUser function to set the user data
  const setUser = (user: Wallet1 | null) => {
    setUserinfo(user);
  };

  const [alltoken, setAlltoken] = useState<DataItem[]>([]);

  return (
    <WalletContext.Provider
      value={{
        userinfo,
        setUserinfo,
        setUser,
        setRgardener,
        rgardener,
        setOpengarden,
        opengarden,
        alltoken,
        setAlltoken,
        sessionKeyProvider,
        setSessionKeyProvider,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
