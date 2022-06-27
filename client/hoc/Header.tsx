import Link from "next/link";
import React from "react";
import { PropsWithChildren } from "react";
import face from "./../assets/face.png";
import BackSvg from "./../components/svg/BackSvg";

interface HeaderI {
  children?: React.ReactNode;
}

const Header: React.FC<PropsWithChildren<HeaderI>> = ({ children }) => {
  const clickExitHandler = () => {
    console.log("Exit");
  };

  return (
    <>
      <header className="Header">
        <div className="ExitWrapper">
          <Link href="/">
            <a onClick={clickExitHandler}>
              <BackSvg />
              <span>Exit</span>
            </a>
          </Link>
        </div>
        <div className="data">
          <span>Nursultan Askarbekuly</span>
          <img src={face.src} alt="face" />
        </div>
      </header>
      {children}
    </>
  );
};

export default Header;
