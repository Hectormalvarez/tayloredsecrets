import type { NextPage } from "next";
import Head from "next/head";
import CreateSecret from "../components/UI/CreateSecret";
import TayloredSecretsHeader from "../components/UI/TayloredSecretsHeader";



const Home: NextPage = () => {

  return (
    <div className="m-auto h-screen max-w-5xl px-8 pt-6">
      <Head>
        <title>Taylored Secrets</title>
        <meta name="description" content="One Time Taylored Secrets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <TayloredSecretsHeader />
        <CreateSecret />
      </main>
    </div>
  );
};

export default Home;
