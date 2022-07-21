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
import PasswordField from "../../components/Form/PasswordField";

const initialSecretState = { id: "", secret: "", createdAt: "", passwordType: "", attempts: 0 };

type FormData = {
  password: string;
};

const Secret: NextPage = () => {
  const [secret, setSecret] = useState(initialSecretState);
  const [decryptedSecret, setDecryptedSecret] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  // get id from url
  const router = useRouter();
  const { id } = router.query;

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
      setButtonClicked(true); // set button clicked state to true for ui
      // deletes secret from cloud
      destroySecret();
    } catch (error: any) {
      setDecryptedSecret(error.message); // if unable to decrypt it will display error message
    }
    resetField("password"); //clears field
  });

  // deletes secret from cloud
  const destroySecret = async () => {
    await API.graphql({
      query: deleteSecret,
      variables: { input: { id } },
    });
    router.push("/");
  };

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
              <PasswordField register={register} />
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
