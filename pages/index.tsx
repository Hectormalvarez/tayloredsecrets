import type { NextPage } from "next";
import Head from "next/head";
import CreateSecretForm from "../components/Form/CreateSecretForm";
import TayloredSecretsHeader from "../components/UI/TayloredSecretsHeader";



const Home: NextPage = () => {

  return (
    <div className="m-auto h-screen max-w-5xl border-l-2 border-r-2 border-slate-700 bg-slate-50 px-8 pt-6">
      <Head>
        <title>Taylored Secrets</title>
        <meta name="description" content="One Time Taylored Secrets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <TayloredSecretsHeader />
        <CreateSecretForm />
      </main>
    </div>
  );
};

export default Home;
