import HeaderWrapper from "./Header.style";
import MobileMenu from "../mobileMenu/MobileMenu";
import blokc from "../../../assets/images/icons/Transparent_Black1.png";
import { HiMenuAlt3 } from "react-icons/hi";
//import Whitepaper from "../../../assets/pdf/whitepaper.pdf";
import { useState } from "react";
import DropdownDemo from "../dropdownDemo/DropdownDemo";
import ConnectWalletButton from "../../button/ConnectWalletButton";
import React from "react";
import TransakWidget from "../../transak/Transak";
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
const Header = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [transakopen, setTransak] = useState<boolean>(false);
  const [accesscodeopen, setAccesscodeopen] = useState<boolean>(false);
  const [code, setCode] = useState<string | undefined>(undefined);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [openModule, setOpenModule] = useState<boolean>(false);

  const handleMobileMenu = () => {
    setIsMobileMenu(!isMobileMenu);
  };

  const buytoken = () => {
    if (code === undefined) {
      setAccesscodeopen(true);
    } else if (isConnected === false) {
      setOpenModule(true);
    } else {
      setTransak(true);
    }
    // console.log("transakopen:", transakopen); // Check if it's being set to true
  };

  return (
    <>
      <HeaderWrapper className="header-section">
        <div className="container">
          <div className="gittu-header-content">
            <div className="gittu-header-left">
              <a className="gittu-header-logo " href="/">
                <img src={blokc} alt="blokc" height={280} width={280} />
                {/*BLOK Capital*/}
              </a>

              <DropdownDemo />
            </div>
            <div className="gittu-header-right">
              <div className="gittu-header-menu-toggle">
                <button className="menu-toggler" onClick={handleMobileMenu}>
                  <HiMenuAlt3 />
                </button>
              </div>
              <div className="gittu-header-right-menu">
                <div
                  className="gittu-header-menu"
                  role="button"
                  onClick={() => buytoken()}
                >
                  <p>Buy Crypto</p>
                </div>

                <ConnectWalletButton
                  setCode={setCode}
                  code={code}
                  setAccesscodeopen={setAccesscodeopen}
                  accesscodeopen={accesscodeopen}
                  isConnected={isConnected}
                  setIsConnected={setIsConnected}
                  openModule={openModule}
                  setOpenModule={setOpenModule}
                />
                {/*<Loginbutton />*/}
              </div>
            </div>
          </div>
        </div>
      </HeaderWrapper>

      {transakopen && <TransakWidget setTransak={setTransak} />}
      {isMobileMenu && <MobileMenu mobileMenuHandle={handleMobileMenu} />}
    </>
  );
};

export default Header;
