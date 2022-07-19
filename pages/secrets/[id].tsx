import React, { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { API } from "aws-amplify";
import { getSecret } from "../../src/graphql/queries";
import { deleteSecret, updateSecret } from "../../src/graphql/mutations";

import { useForm } from "react-hook-form";

import { decrypt } from "../../utils/crypto";

import TayloredSecretsHeader from "../../components/UI/TayloredSecretsHeader";

const initialSecretState = { id: "", secret: "", createdAt: "", attempts: 0 };

type FormData = {
  password: string;
};

const Secret: NextPage = () => {
  const router = useRouter();
  const [secret, setSecret] = useState(initialSecretState);
  const [decryptedSecret, setDecryptedSecret] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  // initialize form management
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormData>();

  // on decrypt secret: decrypts secret text and deletes secret from cloud
  const onDecryptSubmit = handleSubmit(async (data) => {
    try {
      setDecryptedSecret(decrypt(secret.secret, data.password)); // gets password from form to decrypt
      setButtonClicked(true);
      await API.graphql({
        query: deleteSecret,
        variables: { input: { id } },
      });
    } catch (error: any) {
      if (!secret.attempts) {
        secret.attempts = 1;
      } else {
        secret.attempts++;
      }
      setDecryptedSecret(error.message);
      await API.graphql({
        query: updateSecret,
        variables: { input: { id, attempts: secret.attempts } },
      });
    }
    resetField("password"); //clears field
  });

  // destroy secret
  const destroySecret = async () => {
    await API.graphql({
      query: deleteSecret,
      variables: { input: { id } },
    });
    router.push("/");
  };

  // get id from url
  const { id } = router.query;

  // gets the secret from cloud
  const secretQuery = useCallback(async () => {
    if (!id) return;
    try {
      const secretData: any = await API.graphql({
        query: getSecret,
        variables: { id },
      });
      if (!secretData) return;
      setSecret(secretData.data.getSecret);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  // gets secret from cloud on page load
  useEffect(() => {
    secretQuery();
  }, [secretQuery]);

  return (
    <>
      <div className="m-auto max-w-5xl border-l-2 border-r-2 border-slate-700 px-8 pt-6">
        <TayloredSecretsHeader />
        {secret !== null ? (
          <div>
            <p>Secret ID: {secret.id}</p>
            <p>secret created: {secret.createdAt}</p>
            <p>secret Text: {secret.secret}</p>
            <p>decrypt Attempts: {secret.attempts}</p>
            <p>Decrypted Text: {decryptedSecret}</p>
          </div>
        ) : (
          <p>Secret Not Found!</p>
        )}

        {/* Decrypting secret form */}
        {!buttonClicked && secret !== null && (
          <div className="flex flex-col">
            <form onSubmit={onDecryptSubmit}>
              <label className="form-label mb-2 inline-block text-gray-700">
                Enter Password
              </label>
              <input
                className="
                  form-control
                  m-0
                  mb-4
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
                {...register("password", { required: true })}
              />
              <button
                type="submit"
                className="mb-2 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Decrypt Text!
              </button>
            </form>
            <button
              onClick={destroySecret}
              className="mb-4 rounded-lg bg-red-300 px-8 py-3 font-semibold text-white hover:bg-red-800"
            >
              Destroy Secret!
            </button>
          </div>
        )}
        {/* link to homepage */}
        {(secret === null || buttonClicked) && (
          <Link href={"/"}>
            <button
              type="submit"
              className="my-4 mb-4 rounded-lg bg-blue-600 px-8 py-2 font-semibold text-white"
            >
              Create New Secret!
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Secret;
