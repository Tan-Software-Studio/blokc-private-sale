import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import ModalWrapper from "../modal/Modal.style";
import { CgClose } from "react-icons/cg";
import { useWeb3AuthSigner } from "../context/web3-auth-signer";
import { WalletContext, WalletContextType } from "../context/WalletContext";

//import Navlogo from "../../../public/icon/Navlogo.svg";
//import {
//  WalletContext,
//  type WalletContextType,
//} from "~/components/WalletContext";
//import { useWeb3AuthSigner } from "~/context/web3-auth-signer";

const TransakWidget = ({ setTransak }) => {
  const { accountAddress } = useWeb3AuthSigner();
  //  console.log("accountAddress", accountAddress);
  const contextData = useContext(WalletContext) as WalletContextType;
  //console.log("userinfo from contextData:", contextData?.userinfo?.email)
  const email = contextData?.userinfo?.email;

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  useEffect(() => {
    const transakIframe = iframeRef.current;
    const handleMessage = (message: MessageEvent) => {
      if (message.source !== transakIframe) return;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      //console.log("Event ID: ", message?.data?.event_id)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      //console.log("Data: ", message?.data?.data)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (message?.data?.event_id === "TRANSAK_ORDER_SUCCESSFUL") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        //console.log("Order Data: ", message?.data?.data)
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const widgetStyles = {
    container: {
      background: "#f7f7f7",
      padding: "20px",
    },
    iframe: {
      width: "400px",
      height: "600px",
      border: "none",
    },
    link: {
      display: "block",
      marginTop: "10px",
      textAlign: "center",
      textDecoration: "none",
      color: "#0070f3",
      fontWeight: "bold",
    } as React.CSSProperties,
  };

  return (
    <ModalWrapper className="gittu-modal">
      <div className="overlay"></div>
      <div className="gittu-modal-content ">
        <div className="gittu-modal-header">
          <div>{""}</div>
          <div role="button" onClick={() => setTransak(false)}>
            <CgClose className="" size={20} />
          </div>
        </div>
        <div style={widgetStyles.container}>
          <iframe
            id="transak-iframe"
            ref={iframeRef}
            src={`https://global.transak.com/?apiKey=3d606aac-e712-40ae-8ca9-7b4119988d76&cryptoCurrencyCode=USDT&walletAddress=${accountAddress}&email=${email}`}
            style={widgetStyles.iframe}
            allow="camera;microphone;fullscreen;payment"
          ></iframe>
          <a
            className="link"
            href="https://www.google.com/?orderId=%225cf7ad02-e968-4978-a000-c2a8007eee7f%22
        &fiatCurrency=%22INR%22&cryptocurrency=%22ETH%22&fiatAmount=24997.84
        &cryptoAmount=1.35704232&isBuyOrSell=%22BUY%22
        &status=%22PENDING_DELIVERY_FROM_TRANSAK%22
        &walletAddress=%220xF1363D3D55d9e679cC6aa0a0496fD85BDfCF7464%22
        &totalFee=undefined&partnerCustomerId=%220xF1363D3D55d9e679cC6aa0a0496fD85BDfCF7464%22>"
            target="_blank"
            rel="noopener noreferrer"
            style={widgetStyles.link}
          >
            Buy/Sell Crypto with Transak
          </a>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default TransakWidget;
