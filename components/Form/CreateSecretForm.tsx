import type { NextPage } from "next";
import { API } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { createSecret } from "../../src/graphql/mutations";

import { useForm } from "react-hook-form";
import { encrypt } from "../../utils/crypto";
import { useEffect } from "react";

enum PasswordType {
  passphrase = "passphrase",
  nopassword = "no-password",
  pin = "pin",
}

// data types for new secret form
type NewSecretFormData = {
  secret: string;
  passwordType: PasswordType;
  password: string;
};

// creating a next page
const CreateSecretForm: NextPage = () => {
  const router = useRouter(); 
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm<NewSecretFormData>({
    defaultValues: {
      passwordType: PasswordType.nopassword
    },
  });

  const passwordType = watch("passwordType");

  const onSubmit = handleSubmit(async (data) => {
    const id = uuid();
    let secret;
    if (data.password) {
      secret = encrypt(data.secret, data.password);
    } else {
      secret = encrypt(data.secret, passwordType);
    }
    const newSecret = {
      id,
      secret,
    };
    await API.graphql({
      query: createSecret,
      variables: { input: newSecret },
    });
    resetField("secret");
    router.push(`/secrets/${id}`);
  });

  useEffect(() => {
    console.log(passwordType);
  }, [passwordType]);

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col">
        <label htmlFor="secret" className="form-label mb-2 inline-block text-gray-700">
          Secret
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
          placeholder="Enter Secret Here"
        />
        {errors.secret?.type === "required" && (
          <p className="pb-2 text-lg text-red-400">Please enter a secret!</p>
        )}
        <select
          {...register("passwordType")}
          className="
                  form-control
                  m-0
                  mb-2
                  block
                  w-full
                  rounded
                  border
                  border-solid
                  border-gray-600 bg-gray-200
                  bg-clip-padding px-3 py-2.5 text-base
                  font-normal
                  text-gray-700
                  transition
                  ease-in-out
                  focus:border-blue-800 focus:bg-white focus:text-gray-700 focus:shadow-md focus:shadow-blue-300 focus:outline-none
"
        >
          <option value="passphrase">Passphrase</option>
          <option value="pin">Pin</option>
          <option value="no-password">No Password</option>
        </select>
        {passwordType === "passphrase" && (
          <>
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              password to open secret
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
              type={"password"}
              {...register("password")}
              placeholder="Enter Password Here"
            />
          </>
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
          Create Secret
        </button>
      </div>
    </form>
  );
};

export default CreateSecretForm;
