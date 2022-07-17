import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const crypto = require("crypto");
import { useForm } from "react-hook-form";

import Lock from "../public/cyber_padlock.svg";

type FormData = {
  secret: string;
};


const encrypt = (plainText: string | FormData, password: string) => {
  try {
    const iv = crypto.randomBytes(16);
    const key = crypto
      .createHash("sha256")
      .update(password)
      .digest("base64")
      .substr(0, 32);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    let encrypted = cipher.update(plainText);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  } catch (error) {
    console.log(error);
  }
};

const decrypt = (encryptedText: any, password: string) => {
  try {
    const textParts = encryptedText.split(":");
    const iv = Buffer.from(textParts.shift(), "hex");

    const encryptedData = Buffer.from(textParts.join(":"), "hex");
    const key = crypto
      .createHash("sha256")
      .update(password)
      .digest("base64")
      .substr(0, 32);
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

    const decrypted = decipher.update(encryptedData);
    const decryptedText = Buffer.concat([decrypted, decipher.final()]);
    return decryptedText.toString();
  } catch (error) {
    console.log(error);
  }
};


const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    let encryptedText = decrypt(data.secret, "password");
    console.log(encryptedText);
    resetField("secret");
  });

  return (
    <div className="h-screen bg-slate-50">
      <Head>
        <title>Taylored Secrets</title>
        <meta name="description" content="One Time Taylored Secrets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-auto max-w-5xl border-l-2 border-r-2 border-slate-100 px-8 pt-6">
        <div className="flex items-center justify-between ">
          <h1 className="text-4xl font-bold lg:text-7xl">Taylored Secrets</h1>
          <div className="relative h-32 w-32">
            <Image src={Lock} alt="connected lock" layout="fill" />
          </div>
        </div>
          <h2 className="py-8 text-2xl">Safely Shared Secrets!</h2>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label className="form-label mb-2 inline-block text-gray-700">
              Enter Secret
            </label>
            <input
              className="
                  form-control
                  m-0
                  mb-2
                  block
                  w-full
                  rounded
                  border
                  border-solid
                  border-gray-300 bg-white
                  bg-clip-padding px-3 py-2.5 text-base
                  font-normal
                  text-gray-700
                  transition
                  ease-in-out
                  focus:border-blue-800 focus:bg-white focus:text-gray-700 focus:shadow-md focus:shadow-blue-300 focus:outline-none
                "
              type={"text"}
              {...register("secret", { required: true })}
            />
            {errors.secret?.type === "required" && (
              <p className="pb-2 text-lg text-red-400">
                Please enter a secret!
              </p>
            )}
            <button
              type="submit"
              className="
                  w-full
                  rounded
                  bg-blue-600
                  px-6
                  py-2.5
                  text-xl
                  font-bold
                  uppercase
                  leading-tight
                  text-white
                  shadow-md
                  transition duration-150
                  ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                  focus:shadow-lg focus:outline-none
                  focus:ring-0
                  active:bg-blue-800
                  active:shadow-lg
                "
            >
              Send
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
