// src/components/Header.tsx

import React from "react";
import "./Header.css"; // Import the CSS file

const Header: React.FC = () => {
  return (
    <header className="header-container p-8">
      <div className="logo">AI POSTER</div>
      <nav>
        <a href="#contact">Contact</a>
        <a href="#login">Login</a>
      </nav>
    </header>
  );
};

export default Header;
