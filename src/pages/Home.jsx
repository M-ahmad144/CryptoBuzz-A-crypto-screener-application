import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { CryptoProvider } from "../context/CryptoContext";
import { TrendingProvider } from "../context/TrendingContext";
import { StorageProvider } from "../context/StorageContext";

export default function Home() {
  return (
    // the Home Component is my Main root  component so the CryptoProvider and TrendingProvider  warps it out
    <CryptoProvider>
      <TrendingProvider>
        <StorageProvider>
          <main className="relative flex flex-col items-center content-center w-full h-full first-letter: font-nunito text-white">
            <div className="-z-10 fixed bg-gray-300 w-screen h-screen" />
            <Logo />
            <Navigation />
            <Outlet />
          </main>
        </StorageProvider>
      </TrendingProvider>
    </CryptoProvider>
  );
}
