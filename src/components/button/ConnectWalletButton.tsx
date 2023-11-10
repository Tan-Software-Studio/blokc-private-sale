// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import Button from "./Button";
import ModalWrapper from "../modal/Modal.style";
import { CgClose } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";
import {
  Web3AuthMPCCoreKit,
  WEB3AUTH_NETWORK,
  //COREKIT_STATUS,
} from "@web3auth/mpc-core-kit";
import { getFunctionSelector, pad, zeroAddress } from "viem";
import { FiChevronDown } from "react-icons/fi";
import { LucideCopy } from "lucide-react";
import Accesscode from "../header/accesscode/Accesscode";
import clipboardCopy from "clipboard-copy";
import { MdDone } from "react-icons/md";
import Tokenbalance from "../tokenbalance/Tokenbalance";
import { useWeb3AuthSigner } from "../context/web3-auth-signer";
import {
  ECDSAProvider,
  getRPCProviderOwner,
  SessionKeyProvider,
  Operation,
  ParamCondition,
} from "@zerodev/sdk";
import {
  type Wallet1,
  WalletContext,
  type WalletContextType,
} from "../context/WalletContext";

interface UserData {
  accessToken: string;
  authuser: string;
  email: string;
  expires_in: string;
  idToken: string;
  name: string;
  profileImage: string;
  prompt: string;
  scope: string;
  state: {
    instanceId: string;
    verifier: string;
    typeOfLogin: string;
    redirectToOpener: boolean;
  };
  token_type: string;
  typeOfLogin: string;
  verifier: string;
  verifierId: string;
  version_info: string;
}

interface ImportMetaEnv {
  VITE_API_WEB3AUTH_CLIENTID: string;
  // Add other environment variables as needed
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const ConnectWalletButton = ({
  setCode,
  code,
  setAccesscodeopen,
  accesscodeopen,
  setIsConnected,
  isConnected,
  openModule,
  setOpenModule,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    setWeb3AuthSigner,
    web3AuthSigner,
    accountAddress,
    setAccountAddress,
    setSessionKeyProvider,
  } = useWeb3AuthSigner();
  // console.log("Web3AuthSigner--->", web3AuthSigner);
  // console.log("accountAddress--->", accountAddress);
  const [coreKitInstance, setCoreKitInstance] =
    useState<Web3AuthMPCCoreKit | null>(null);
  const [sucessfullogin, setsucessfullogin] = useState<boolean>(false);
  const [copy, setcopy] = useState<boolean>(false);
  const contextData = useContext(WalletContext) as WalletContextType;
  const userinfo: Wallet1 | null = contextData?.userinfo;
  const setUserinfo = contextData?.setUserinfo;
  // console.log(code);

  //const coreKitInstance = new Web3AuthMPCCoreKit({
  //  web3AuthClientId:
  //    "BKK0Wou6EXM1bUgBtQhlCGSHhB_ghRUpuJGjnl4W_FhNfCBWvNi71Ckc9qUq6IR88YyrPz4mRZ7Jb7iXScHgnuk",
  //  web3AuthNetwork: WEB3AUTH_NETWORK.MAINNET,
  //  uxMode: "popup",
  //});

  useEffect(() => {
    const init = async () => {
      // Initialization of Service Provider
      try {
        const coreKitInstance = new Web3AuthMPCCoreKit({
          web3AuthClientId: import.meta.env.VITE_API_WEB3AUTH_CLIENTID,
          web3AuthNetwork: WEB3AUTH_NETWORK.MAINNET,
          uxMode: "popup",
        });
        await coreKitInstance.init();
        // console.log(coreKitInstance);

        setCoreKitInstance(coreKitInstance);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const login = async () => {
    if (!coreKitInstance) {
      console.log("coreKitInstance not initialized yet");
      return;
    }
    try {
      setIsLoading(true);

      const provider = await coreKitInstance.connect({
        subVerifierDetails: {
          typeOfLogin: "google",
          verifier: "blokc-dapp",
          clientId: import.meta.env.VITE_API_GOOGLE_ID,
        },
      });
      console.log("provider: ", provider);
      //setCoreKitInstance(coreKitInstance);
      //google - tkey - w3a
      //new-blokc-verifier //
      if (provider === null) {
        throw new Error("Failed to login: provider is null");
      }
      setWeb3AuthSigner(provider);
      //setOpenModuleGoogle(true);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call

      const userdata: UserData =
        coreKitInstance.getUserInfo() as unknown as UserData;
      setUserinfo(userdata);

      //localStorage.setItem("userRole", selectedOption);

      //setIsConnected(true);

      setsucessfullogin(true);

      //router.push(Routes.wallet.root);
    } catch (error) {
      if ((error as Error).message === "required more shares") {
        resetAccount();
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAccount = async (): Promise<void> => {
    if (!coreKitInstance) {
      throw new Error("coreKitInstance is not set");
    }
    await coreKitInstance.CRITICAL_resetAccount();
    console.log("reset account successful");
  };

  const openAccount = () => {
    setOpenModule(true);
  };

  const logout = async () => {
    console.log("---------------");

    if (!coreKitInstance) {
      throw new Error("coreKitInstance not found");
    }
    await coreKitInstance.logout();
    setWeb3AuthSigner(undefined);
    setOpenModule(false);
    setsucessfullogin(false);
    setAccountAddress(undefined);
    setCode(undefined);
  };

  const popupopen = () => {
    if (code === undefined) {
      setAccesscodeopen(true);
    } else {
      setOpenModule(true);
    }
  };

  const close1 = () => {
    setOpenModule(false);
    setIsLoading(false);
  };

  const close = () => {
    console.log("close-----------------");
    setOpenModule(false);
  };

  const finalsubmit = () => {
    setOpenModule(false);
    setIsConnected(true);
  };

  const notify = () => {
    if (accountAddress) {
      void clipboardCopy(accountAddress);
      setcopy(true);
      setTimeout(() => {
        setcopy(false);
      }, 100);
    }
  };

  useEffect(() => {
    if (web3AuthSigner) {
      const sessionKey = import.meta.env.VITE_API_PAYMASTER_SESSION_KEY;
      const contractAddress = "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23";

      const ecdcfunction = async () => {
        const ecdsaProvider = await ECDSAProvider.init({
          projectId: import.meta.env.VITE_API_ZERODEV_PROJECT_ID,
          owner: getRPCProviderOwner(web3AuthSigner),
        });

        const address = await ecdsaProvider.getAddress();
        setAccountAddress(address);

        const sessionKeyProvider = await SessionKeyProvider.init({
          // ZeroDev project ID
          projectId: import.meta.env.VITE_API_ZERODEV_PROJECT_ID,
          // The master signer
          defaultProvider: ecdsaProvider,
          // the session key (private key)
          sessionKey,
          // session key parameters
          sessionKeyData: {
            // The UNIX timestamp at which the session key becomes valid
            validAfter: 0,
            // The UNIX timestamp at which the session key becomes invalid
            validUntil: 0,
            // The permissions
            // Each permission can be considered a "rule" for interacting with a particular
            // contract/function.  To create a key that can interact with multiple
            // contracts/functions, set up one permission for each.
            permissions: [
              {
                // Target contract to interact with
                target: contractAddress,
                // Maximum value that can be transferred.  In this case we
                // set it to zero so that no value transfer is possible.
                valueLimit: 0n,
                // The function (as specified with a selector) that can be called on
                sig: getFunctionSelector("mint(address)"),
                // Whether you'd like to call this function via CALL or DELEGATECALL.
                // DELEGATECALL is dangerous -- don't use it unless you know what you
                // are doing.
                operation: Operation.Call,
                // Each "rule" is a condition on a parameter.  In this case, we only
                // allow for minting NFTs to our own account.
                rules: [
                  {
                    // The condition in this case is "EQUAL"
                    condition: ParamCondition.EQUAL,
                    // The offset of the parameter is 0 since it's the first parameter.
                    // We will simplify this later.
                    offset: 0,
                    // We pad the address to be the correct size.
                    // We will simplify this later.
                    param: pad(address, { size: 32 }),
                  },
                ],
              },
            ],
            // The "paymaster" param specifies whether the session key needs to
            // be used with a specific paymaster.
            // Without it, the holder of the session key can drain ETH from the
            // account by spamming transactions and wasting gas, so it's recommended
            // that you specify a trusted paymaster.
            //
            // address(0) means it's going to work with or without paymaster
            // address(1) works only with paymaster
            // address(paymaster) works only with the specified paymaster
            paymaster: zeroAddress,
          },
        });
        setSessionKeyProvider(sessionKeyProvider);
        // console.log("sessionKeyProvider", sessionKeyProvider);
      };

      ecdcfunction();
    }
  });

  return (
    <>
      {isConnected && web3AuthSigner && code ? (
        <>
          <Button
            // walletAddress
            className="connect-wallet-btn"
            variant={"connect"}
            onClick={openAccount}
          >
            <span>
              {/*{accountAddress
                ? accountAddress.slice(0, 3) + "...." + accountAddress.slice(-3)
                : ""}*/}
              Hi, {userinfo?.name}
            </span>
            {/*<span className="short-address">{accountAddress}</span>*/}
            <FiChevronDown />
          </Button>

          {openModule && (
            <ModalWrapper className="gittu-modal">
              <div className="overlay"></div>
              <div className="gittu-modal-content">
                <div className="gittu-modal-header">
                  <div>{""}</div>
                  <div onClick={close} role="button">
                    <CgClose className="" size={20} />
                  </div>
                </div>
                <div className="flex flex-column">
                  <div className="d-flex flex-column justify-content-center text-center">
                    <p className="mb-2 text-center">
                      Hi {userinfo?.name}, your blockchain smart wallet account
                      with Address:
                    </p>
                    <div className="d-flex flex-row mx-auto gap-2 mb-3 ">
                      <div>
                        <h5 className="">
                          {accountAddress
                            ? accountAddress.slice(0, 5) +
                              "...." +
                              accountAddress.slice(-5)
                            : null}
                        </h5>
                      </div>
                      <div className="mx-2">
                        <button onClick={notify} className=" rounded-circle ">
                          {copy ? (
                            <MdDone size={15} />
                          ) : (
                            <LucideCopy size={15} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Tokenbalance />
                    </div>
                    <div>
                      <div>
                        <a
                          href={`https://etherscan.io/address/${accountAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="d-flex flex-column justify-content-center mb-2"
                        >
                          <Button
                            className="connect-wallet-btn"
                            variant={"connect"}
                            type="submit"
                          >
                            View on Etherscan Link
                          </Button>
                        </a>
                        <div
                          onClick={logout}
                          className="d-flex flex-column justify-content-center"
                        >
                          <Button variant={"connect"} role="button">
                            LogOut
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ModalWrapper>
          )}
        </>
      ) : (
        <>
          <div onClick={() => popupopen()}>
            <Button className="connect-wallet-btn" variant={"connect"}>
              Login
            </Button>
          </div>
          {openModule && (
            <ModalWrapper className="gittu-modal">
              <div className="overlay"></div>
              <div className="gittu-modal-content">
                {accountAddress ? null : (
                  <>
                    <div className="gittu-modal-header">
                      <div>{""}</div>
                      <div onClick={() => close1()} role="button">
                        <CgClose className="" size={20} />
                      </div>
                    </div>
                    <div className="mx-auto text-center">
                      <p className="mb-3">
                        Thank you for entering the Private Sale Zone, now login
                        with your gmail to whitelist yourself for the sale and
                        create your onchain smart wallet account.
                      </p>
                      <h4
                        onClick={() => login()}
                        className="d-flex flex-column justify-content-center"
                        role="button"
                      >
                        <Button
                          className="connect-wallet-btn"
                          variant={"connect"}
                        >
                          {isLoading && (
                            <div className="">
                              <div className="spinner-border " role="status">
                                <span className="sr-only"></span>
                              </div>
                            </div>
                          )}
                          <div className={`${isLoading ? "disabled" : " "}`}>
                            <span>
                              <FcGoogle size={28} />
                            </span>{" "}
                            Login with Google
                          </div>
                        </Button>
                      </h4>
                      {/*<button onClick={criticalResetAccount}>BackupShare</button>*/}
                      {/*<button onClick={keyDetails}>Get Key Details</button>*/}
                      <div className="d-flex flex-column justify-content-center">
                        {isLoading && (
                          <p className="text-warning mx-auto mt-3">
                            {" "}
                            Please Wait...{" "}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div className="d-flex flex-column justify-content-center">
                  {sucessfullogin && accountAddress && (
                    <div className="flex flex-column">
                      <div className="">
                        <div className="text-center">
                          <h5 className="mb-3 ">
                            Congratulations {userinfo?.name}, you have just
                            created your blockchain smart wallet account with
                            Address:
                          </h5>
                          {/*<p className="d-flex flex-column justify-content-center">/*/}
                          <span>
                            {accountAddress
                              ? accountAddress.slice(0, 5) +
                                "...." +
                                accountAddress.slice(-5)
                              : null}
                          </span>

                          <button
                            onClick={notify}
                            className="mx-2 !bg-transparent rounded-5"
                          >
                            {copy ? (
                              <MdDone size={15} />
                            ) : (
                              <LucideCopy size={15} />
                            )}
                          </button>

                          {/*<span className="">{userinfo.name}</span>*/}
                          {/*</p>*/}
                          <div className="d-grid gap-2 mt-3">
                            <a
                              href={`https://etherscan.io/address/${accountAddress}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="d-flex flex-column justify-content-center"
                            >
                              <Button
                                className="connect-wallet-btn"
                                variant={"connect"}
                                type="submit"
                              >
                                <p className="mx-2">View on Etherscan Link</p>
                              </Button>
                            </a>
                            <div
                              className="d-flex flex-column justify-content-center"
                              onClick={finalsubmit}
                            >
                              <Button
                                className="connect-wallet-btn"
                                variant={"connect"}
                              >
                                <p className="mx-2">
                                  Continue to the Private Sale
                                </p>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ModalWrapper>
          )}
        </>
      )}
      {accesscodeopen && (
        <Accesscode
          setCode={setCode}
          setAccesscodeopen={setAccesscodeopen}
          setOpenModule={setOpenModule}
        />
      )}
    </>
  );
};

export default ConnectWalletButton;
