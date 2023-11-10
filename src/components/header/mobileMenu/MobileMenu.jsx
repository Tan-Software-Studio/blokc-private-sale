import MobileMenuWrapper from "./MobileMenu.style";
import Logo1 from "../../../assets/images/icons/Transparent_Black1.png"
import Telegram from "../../../assets/images/icons/telegram.svg";
import Discord from "../../../assets/images/icons/discord.svg";
import Twitter from "../../../assets/images/icons/twitter.svg";
import { AiOutlineClose } from "react-icons/ai";
import ConnectWalletButton from "../../button/ConnectWalletButton";
//import Whitepaper from "../../../assets/pdf/whitepaper.pdf";

// eslint-disable-next-line react/prop-types
const MobileMenu = ({ mobileMenuHandle }) => {
  return (
    <MobileMenuWrapper>
      <div className="gittu-mobile-menu-content">
        <div className="mobile-menu-top">
          <a className="mobile-logo" href="/">
            <img src={Logo1} alt="Logo" height={350} width={350} />
          </a>
          <button className="mobile-menu-close" onClick={mobileMenuHandle}>
            <AiOutlineClose />
          </button>
        </div>

        <ul className="mobile-menu-list mb-40">
          <li>
            <a href="https://prototype.blokcapital.io" target="_blank" rel="noopener noreferrer">
              Prototype
            </a>
          </li>
          <li>
            <a href="https://blokcapital.io" target="_blank" rel="noopener noreferrer">Website</a>
          </li>
          <li>
            <a href="https://docsend.com/view/qqzdvsv2q47g6t9y" target="_blank" rel="noopener noreferrer">Whitepaper</a>
          </li>
        </ul>

        <ul className="mobile-social-links mb-40">
          <li>
            <a
              href="https://web.telegram.org/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Telegram} alt="icon" />
            </a>
          </li>
          <li>
            <a href="https://discord.com/" target="_blank" rel="noreferrer">
              <img src={Discord} alt="icon" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <img src={Twitter} alt="icon" />
            </a>
          </li>
        </ul>

        <ul className="mobile-menu-list mb-40">
          <li>
            <a href="#" >
              Buy Crypto
            </a>
          </li>
        </ul>

        <div className="d-flex justify-content-center">
          <ConnectWalletButton />
        </div>
      </div>
    </MobileMenuWrapper>
  );
};

export default MobileMenu;
