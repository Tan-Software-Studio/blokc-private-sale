/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Button from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import ModalWrapper from "./Modal.style";
import abi from "../../abi/Abi.json";
import { CgClose } from "react-icons/cg";
import useWallet from "../hooks/use-wallet";
import { useWeb3AuthSigner } from "../context/web3-auth-signer";

// eslint-disable-next-line react/prop-types
const Modal = ({ setPpendeposit, setIsModalOpen, ...props }) => {
  const [paymentAmount, setPaymentAmount] = useState(240);
  const { accountAddress, sessionKeyProvider } = useWeb3AuthSigner();
  const [selectedToken, setSelectedToken] = useState("");
  const [loding, setLoding] = useState(false);
  const { data } = useWallet();

  const handlePaymentInput = (event) => {
    setPaymentAmount(event.target.value);
    if (!isNaN(enteredValue) && enteredValue >= 240) {
      // Update the state only if the value is valid
      setPaymentAmount(enteredValue);
    }
  };
  const openDeposite = () => {
    setPpendeposit(true);
    setIsModalOpen(false);
  };

  const buytoken = async () => {
    setLoding(true);
    const contractABI = abi;
    const contractAddress = "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23";
    const { hash } = await sessionKeyProvider.sendUserOperation({
      target: contractAddress,
      data: encodeFunctionData({
        abi: contractABI,
        functionName: "updateAndCall",
        args: [paymentAmount, selectedToken],
      }),
    });

    const hashnew = await sessionKeyProvider.waitForUserOperationTransaction(
      hash
    );
    console.log("hashnew", hashnew);
    if (hashnew) {
      setLoding(false);
    }
  };
  return (
    <>
      <ModalWrapper className="gittu-modal" {...props}>
        <div className="overlay"></div>
        <div className="gittu-modal-content">
          <div className="gittu-modal-header">
            <h4 className="ff-orbitron text-white text-uppercase">
              Be an early investor
            </h4>
            <button onClick={() => setIsModalOpen(false)}>
              <CgClose />
            </button>
            <div className="mb-20">
              <div className="d-flex flex-row justify-content-between align-items-center">
                <div>
                  <h5 className="ff-outfit fw-600 text-white text-uppercase">
                    Balance : {accountAddress ? data?.totalBalance : "0"}
                  </h5>
                </div>
                <div className="" onClick={openDeposite}>
                  <Button className="connect-wallet-btn" variant={"connect"}>
                    Deposit
                  </Button>
                </div>
              </div>
            </div>

            <div className="presale-item mb-25">
              <h6>Amount</h6>
              <div className="input-group">
                <input
                  type="number"
                  min="240"
                  step="0.01"
                  name="payment-amount"
                  id="payment-amount"
                  placeholder="240"
                  value={paymentAmount}
                  onChange={handlePaymentInput}
                />
                <div className="input-group-dropdown">
                  <Dropdown setSelectedToken={setSelectedToken} />
                </div>
              </div>
            </div>
            <div className="presale-item mb-25">
              <h6>Get Amount ( {"BLOKC"} )</h6>
              <input
                type="text"
                name="get-amount"
                id="get-amount"
                placeholder="0" // Initially set to 0
                value={(paymentAmount * 100).toFixed(2)} // Calculate and display the Get Amount
              />
            </div>

            <ul className="token-info-list mb-35">
              <li>
                <p>$ Price</p>
                <p>0.01 USDT</p>
              </li>
              {/*<li>
                <p>Bonus 0%</p>
                <p>0</p>
              </li>*/}
              <li>
                <p>Total Amount</p>
                <p>{(paymentAmount * 100).toFixed(2)}</p>
              </li>
            </ul>
            <div className="d-flex flex-column justify-content-center">
              <Button
                variant={props.variant === "v2" ? "gadient2" : "gradient"}
                //onClick={buyToken}
                className="btn-approve "
              >
                Approve
              </Button>
            </div>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};

export default Modal;