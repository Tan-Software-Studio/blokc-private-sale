// CodeChecker.js

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import ModalWrapper from "../../modal/Modal.style";
import Button from "../../button/Button";
import { CgClose } from "react-icons/cg";

// eslint-disable-next-line react/prop-types
const Accesscode = ({ setCode, setAccesscodeopen, setOpenModule }) => {
  const [userInput, setUserInput] = useState("");
  const staticCode = import.meta.env.VITE_API_ACCESSCODE;

  const [codeMatchednot, setCodeMatchednot] = useState(false);
  const [loding, setLoding] = useState(false);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
    setCode(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setCodeMatchednot(false);
    setLoding(true);

    if (userInput === staticCode) {
      // Show loading state
      // Simulate loading for 2 seconds before closing the modal
      //setTimeout(() => {
      setLoding(false);
      setAccesscodeopen(false);
      setOpenModule(true);
      //}, 100);
    } else {
      // Simulate loading for 2 seconds before setting the "Code not matched" state
      //setTimeout(() => {
      setLoding(false);
      setCodeMatchednot(true);
      //}, 1000);
    }
  };

  return (
    <ModalWrapper className="gittu-modal">
      <div className="overlay"></div>
      <div className="mx-auto">
        <div className="gittu-modal-content">
          <div className="gittu-modal-header">
            <div>{""}</div>
            <div onClick={() => setAccesscodeopen(false)} role="button">
              <CgClose className="" size={20} />
            </div>
          </div>
          <div className="mb-3">
            <h5>Please enter the Private Round Access Code :</h5>
          </div>
          <div>
            <form
              onSubmit={handleFormSubmit}
              className="d-flex flex-column justify-content-center"
            >
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                className="mb-3"
              />
              <Button
                className="connect-wallet-btn mb-3"
                variant={"connect"}
                type="submit"
              >
                {loding ? (
                  <div
                    className="spinner-border connect-wallet-btn "
                    role="status"
                  >
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  <p>Submit</p>
                )}
              </Button>

              {/*{codeMatched && <p className='text-center text-success' >Code matched!</p>}*/}
              {codeMatchednot && (
                <p className="text-center text-danger"> Incorrect Code</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Accesscode;
