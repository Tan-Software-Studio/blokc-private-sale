// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import DropdownDemoStyles from './DropdownDemo.style';
import { BsGrid } from 'react-icons/bs';

const DropdownDemo = () => {
  const [isDropdownDemoActive, setIsDropdownDemoActive] = useState(false);
  const handleDropdownDemo = () => {
    setIsDropdownDemoActive(!isDropdownDemoActive);
  };

  return (
    <DropdownDemoStyles>
      <button className="demo-btn" onClick={handleDropdownDemo}>
        <BsGrid />
      </button>
      <ul className={`dropdown-demo-list ${isDropdownDemoActive ? 'active' : ''}`}>
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
    </DropdownDemoStyles>
  );
};

export default DropdownDemo;
