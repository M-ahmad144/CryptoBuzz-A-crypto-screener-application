import React from "react";
import logoSvg from "../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div>
      <Link
        to="/"
        className="top-[1.5rem] left-[1.5rem] absolute flex items-center text-cyan text-lg [text-decoration:none]"
      >
        <img src={logoSvg} alt="CryptoBuzz" />
        <span className="flex capitalize">CryptoBuzz</span>
      </Link>
    </div>
  );
}
