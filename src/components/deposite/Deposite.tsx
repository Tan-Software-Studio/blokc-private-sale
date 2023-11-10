import React, { useState } from "react";
import { MdArrowBack, MdDone } from "react-icons/md";
import ModalWrapper from "../modal/Modal.style";
import Button from "../button/Button";
import { CgClose } from "react-icons/cg";
import QR from "../../assets/images/icons/scan.svg";
import depositearrow from "../../assets/images/icons/depositearrow.svg";
import { LucideCopy } from "lucide-react";
import clipboardCopy from "clipboard-copy";
import { useWeb3AuthSigner } from "../context/web3-auth-signer";
const Deposite = ({ setPpendeposit, setIsModalOpen }) => {
  const [copy, setcopy] = useState<boolean>(false);
  const { accountAddress } = useWeb3AuthSigner();
  const notify = () => {
    if (accountAddress) {
      void clipboardCopy(accountAddress);
      setcopy(true);
      setTimeout(() => {
        setcopy(false);
      }, 100);
    }
  };

  const colse = () => {
    setPpendeposit(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <ModalWrapper className="gittu-modal">
        <div className="overlay"></div>
        <div className="gittu-modal-content">
          <div className="gittu-modal-header mb-2">
            <h4 className="ff-orbitron text-white text-uppercase">Deposite</h4>
            <button onClick={colse}>
              <CgClose />
            </button>
          </div>
          <div className="d-flex justify-content-center align-items-center mb-3">
            <img
              src={QR}
              alt="logo"
              height="150"
              width="150"
              className="shadow-lg rounded-3  bg-light p-1"
            />
          </div>

          <div className="fs-6 mb-3">
            <p className="text-center text">
              Send only USDT (ERC 20 - Ethereum Network){" "}
            </p>
            <p className="text-center text-xs">
              Sending any other coins may result in permanent loss.
            </p>
          </div>

          <div className="d-flex flex-row gap-1 align-items-center gap-2 my-2 bg-transparent rounded-3 p-2 Larger shadow mb-3">
            <div>
              <img src={depositearrow} alt="arrow" height={50} width={50} />
            </div>
            <div>
              <p className="mx-auto">
                Copy wallet address and send USDT (ERC 20) from external wallet.
              </p>
            </div>
          </div>
          <div className="d-flex flex-row mx-auto justify-content-center gap-2">
            <div className="">
              <h5>
                {accountAddress
                  ? accountAddress.slice(0, 5) +
                    "...." +
                    accountAddress.slice(-5)
                  : null}
              </h5>
            </div>
            <div className="mx-2">
              <button onClick={notify} className="rounded-circle">
                {copy ? <MdDone size={15} /> : <LucideCopy size={15} />}
              </button>
            </div>
          </div>
          {/*<div className="flex items-center justify-center space-x-2 font-bold">
            <p className=""> Address:</p>
            <p className="text-base">
              {`0x${
                accountAddress
                  ? accountAddress.slice(0, 3) +
                    "...." +
                    accountAddress.slice(-3)
                  : ""
              }`}
            </p>*/}
          {/*<div className="">
              <button
                onClick={notify}
                className="rounded-full bg-[#243892] px-2 py-2 text-white"
              >
                {copy ? <MdDone size={15} /> : <LucideCopy size={15} />}
              </button>
            </div>*/}
          <div className="d-flex flex-row gap-1 align-items-center gap-2 my-2 bg-transparent rounded-3 p-2 Larger shadow mb-5">
            <div>
              <img src={depositearrow} alt="arrow" height={50} width={50} />
            </div>
            <div>
              <p className="mx-auto">
                Buy USDT Crypto using Fiat, in case you do not have crypto in
                external wallet.
              </p>
            </div>
          </div>

          <div className="d-flex flex-column justify-content-center">
            <Button
              variant={"gradient"}
              //onClick={buyToken}
              className="btn-approve"
              //  onClick={handleBuyCryptoClick}
            >
              Buy Crypto
            </Button>
          </div>
        </div>
      </ModalWrapper>
      {/*{showTransakWidget && <Buycrypto />}*/}
    </>
  );
};

export default Deposite;
