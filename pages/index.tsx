import type { NextPage } from "next";
import Head from "next/head";
import CreateSecretForm from "../components/Form/CreateSecretForm";
import TayloredSecretsHeader from "../components/UI/TayloredSecretsHeader";



const Home: NextPage = () => {

  return (
    <div className="h-screen bg-slate-50">
      <Head>
        <title>Taylored Secrets</title>
        <meta name="description" content="One Time Taylored Secrets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-auto max-w-5xl border-l-2 border-r-2 border-slate-100 px-8 pt-6">
        <TayloredSecretsHeader />
        <CreateSecretForm />
      </main>
    </div>
  );
};

export default Home;
