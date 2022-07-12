import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Lock from "../public/cyber_padlock.svg";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-300 h-full">
      <Head>
        <title>Taylored Secrets</title>
        <meta name="description" content="One Time Taylored Secrets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="mx-auto flex max-w-5xl justify-between border-l-2 border-r-2 border-slate-600 px-8 pt-6 items-center">
          <h1 className="text-7xl font-bold">Taylored Secrets</h1>
          <Image src={Lock} alt="connected lock" width={128} height={128} />
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
