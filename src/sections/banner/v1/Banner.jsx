import BannerWrapper from "./Banner.style";
import Countdown from "../../../components/countdown/Countdown";
import Progressbar from "../../../components/progressbar/Progressbar";
import Button from "../../../components/button/Button";

import Telegram from "../../../assets/images/icons/telegram.svg";
import Discord from "../../../assets/images/icons/discord.svg";
import Twitter from "../../../assets/images/icons/twitter.svg";
import Medium from "../../../assets/images/icons/medium.svg";
import Reddit from "../../../assets/images/icons/reddit.svg";
import Instagram from "../../../assets/images/icons/instagram.svg";
import Linkedin from "../../../assets/images/icons/linkedin.svg";

import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import Data from "../../../assets/data/bannarV3";
import { useEffect } from "react";
import Deposite from "../../../components/deposite/Deposite";

// eslint-disable-next-line react/prop-types
const Banner = ({ accountAddress }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalHandle = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [opendeposit, setPpendeposit] = useState(false);
  const [stageEnd, setStageEnd] = useState(1703916000);
  useEffect(() => {
    setStageEnd(1703916000);
  }, []);

  return (
    <>
      <BannerWrapper>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="mb-40 text-center">
                <div className="mb-20">
                  <h5 className="ff-outfit fw-600 text-white text-uppercase">
                    Private Sale Starts in{" "}
                  </h5>
                </div>
                <div className="mb-20 d-flex justify-content-center">
                  <Countdown endDate={stageEnd} font="orbitron" />
                </div>
                <div className="mb-20">
                  <h1 className="banner-title">
                    {Data.title}
                    <br />
                    {Data.titleExtra}
                  </h1>
                </div>
                <h5 className="ff-outfit text-white">{Data.subtitle}</h5>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="mb-2 d-flex align-items-center justify-content-between gap-1 flex-wrap">
                <h5 className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                  Stage 1 : 20 % Bonus !
                </h5>
                <h5 className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                  2000 / 10000
                </h5>
              </div>

              <div className="mb-30">
                <Progressbar done="20" variant="dashed" />
              </div>

              <div className="mb-30 text-center">
                <p className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                  1 BLOKC = 0.01 USDT
                </p>
                <p className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                  NEXT STAGE PRICE = 0.001 ETH
                </p>
              </div>

              <div className="mb-74 d-flex align-items-center justify-content-center">
                <Button variant="gradient" onClick={modalHandle}>
                  Buy now
                </Button>
              </div>

              <ul className="social-links">
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
                  <a
                    href="https://discord.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Discord} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Twitter} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://medium.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Medium} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Reddit} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Instagram} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Linkedin} alt="icon" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </BannerWrapper>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          setPpendeposit={setPpendeposit}
        />
      )}
      {opendeposit && (
        <Deposite
          setPpendeposit={setPpendeposit}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default Banner;
