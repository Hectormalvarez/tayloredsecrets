import type { NextPage } from "next";
import Image from "next/image";

import Lock from "../../public/cyber_padlock.svg";


const Header: NextPage = () => {
  return (
    <>
      <div className="flex items-center justify-between ">
        <h1 className="text-4xl font-bold lg:text-7xl">Taylored Secrets</h1>
        <div className="relative h-32 w-32">
          <Image src={Lock} alt="connected lock" layout="fill" />
        </div>
      </div>
      <h2 className="py-16 text-2xl">Safely Share Private information!</h2>
    </>
  );
}

export default Header;
