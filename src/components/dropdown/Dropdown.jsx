import DropdownWrapper from "./Dropdown.style";
import { useState } from "react";

import EthIcon from "../../assets/images/token/eth.png";
import UsdtIcon from "../../assets/images/token/usdt.png";
import { payWith } from "../../contracts/config";

const Dropdown = ({ setSelectedToken }) => {
  const dropdownList = [
    {
      id: "1",
      icon: EthIcon,
      title: "ETH",
    },
    {
      id: "2",
      icon: UsdtIcon,
      title: "USDT",
      address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    },
  ];

  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [titleText, setTitleText] = useState(payWith);
  const [selectedImg, setSelectedImg] = useState(UsdtIcon);

  const dropdownHandle = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const handleDropdownData = (item) => {
    setTitleText(item.title);
    setSelectedImg(item.icon);
    setIsDropdownActive(false);
    setSelectedToken(item.address);
  };

  return (
    <DropdownWrapper>
      <button className="dropdown-toggle" onClick={dropdownHandle}>
        <img src={selectedImg} alt="icon" />
        <span>{titleText}</span>
      </button>
      {isDropdownActive && (
        <ul className="dropdown-list">
          {dropdownList.map((item, i) => (
            <li key={i}>
              <a href="#" onClick={() => handleDropdownData(item)}>
                <img src={item.icon} alt="icon" />
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </DropdownWrapper>
  );
};

export default Dropdown;
