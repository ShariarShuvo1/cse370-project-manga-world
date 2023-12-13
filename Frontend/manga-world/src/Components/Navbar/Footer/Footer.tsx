import React from "react";

function Footer() {
  return (
    <div className="flex fixed bottom-0 bg-black text-white text-2xl items-center justify-between mx-auto w-full">
      <p>&copy; 2023 Amakekaru</p>
      <a
        href="https://github.com/Jafor2646/cse370-project"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        <img
          src={require("./../../../Assets/Images/Icons/github-icon-white.png")}
          alt="Github Logo"
          className="w-8 p-1 hover:cursor-pointer"
        />
        Source Code
      </a>
    </div>
  );
}

export default Footer;
