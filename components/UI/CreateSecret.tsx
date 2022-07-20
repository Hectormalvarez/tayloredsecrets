import type { NextPage } from "next";
import { API } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { createSecret } from "../../src/graphql/mutations";

import { useForm } from "react-hook-form";
import { encrypt } from "../../utils/crypto";
import Input from "../Form/Input";
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

// Main next page
export default function CreateSecret() {
  const router = useRouter();

  // initialize form
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewSecretFormData>({
    defaultValues: {
      passwordType: PasswordType.nopassword,
    },
  });

  // watch the selected password type
  const passwordType = watch("passwordType");

  // form onsubmit function
  const onSubmit = handleSubmit(async (data) => {
    const id = uuid(); //create id
    let secret; //initialize secret viariable
    if (data.passwordType === "passphrase" || data.passwordType === "pin") {
      // if the password type is passphrase of pin it's assigned to the variable
      secret = encrypt(data.secret, data.password);
    } else {
      secret = encrypt(data.secret, passwordType); // if no password is selected the type is used as the password
    }
    const newSecret = {
      // initialize secret object to save to cloud
      id,
      secret,
      passwordType,
      attempts: 0,
    };
    try {
      await API.graphql({
        // call to aws api to save secret
        query: createSecret,
        variables: { input: newSecret },
      });
    } catch (error) {
      console.log(error);
    }
    resetField("secret"); // clears the secret field
    router.push(`/secrets/${id}`); // sends user to secret page
  });

  useEffect(() => {
    console.log(passwordType);
  }, [passwordType]);

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col">
        <Input
          fieldName="secret"
          options={{ type: "text", placeholder: "Enter Secret Here" }}
          register={register}
          registerOptions={{ required: true }}
        />
        {errors.secret?.type === "required" && (
          <p className="pb-2 text-lg text-red-400">Please enter a secret!</p>
        )}
        <PasswordSelect
          register={register}
          passwordType={passwordType}
          setValue={setValue}
        />
        {passwordType === "passphrase" && (
          <Input
            fieldName="password"
            options={{ type: "password", placeholder: "Enter Password" }}
            register={register}
            registerOptions={{ required: true }}
          />
        )}
        <SecretButton />
      </div>
    </form>
  );
}

const SecretButton = () => {
  return (
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
  );
};

const PasswordSelect = ({ register, passwordType, setValue }: any) => {
  return (
    <div className="flex">
      {["passphrase", "pin"].map((name) => (
        <div className="form-check form-check-inline p-2 cursor-pointer" key={name}>
          <input
            className={`
            form-check-input form-check-input float-left mt-1 mr-2 h-4 w-4 appearance-none rounded-full 
            border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 
            checked:border-blue-600 checked:bg-blue-600 focus:outline-none cursor-pointer
          `}
            type="radio"
            id={name}
            name="passwordSelectOptions"
            value={name}
            {...register("passwordType")}
          />
          <label
            className="form-check-label inline-block text-gray-800 cursor-pointer capitalize font-bold"
            htmlFor={name}
          >
            {name}
          </label>
        </div>
      ))}
      <div className="form-check form-check-inline w-4 h-4 p-2 ">
        <input
          className={`
            hidden
          `}
          type="radio"
          id="no-password"
          name="passwordSelectOptions"
          value={"no-password"}
          {...register("passwordType")}
        />
        <label htmlFor="no-password" className="cursor-pointer">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=""
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.60253 15.1367C9.41053 15.1367 9.21853 15.0637 9.07253 14.9167C8.77953 14.6237 8.77953 14.1497 9.07253 13.8567L13.8645 9.06472C14.1575 8.77172 14.6315 8.77172 14.9245 9.06472C15.2175 9.35772 15.2175 9.83172 14.9245 10.1247L10.1325 14.9167C9.98653 15.0637 9.79453 15.1367 9.60253 15.1367Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.3965 15.1396C14.2045 15.1396 14.0125 15.0666 13.8665 14.9196L9.07046 10.1226C8.77746 9.82965 8.77746 9.35565 9.07046 9.06265C9.36446 8.76965 9.83846 8.76965 10.1305 9.06265L14.9265 13.8596C15.2195 14.1526 15.2195 14.6266 14.9265 14.9196C14.7805 15.0666 14.5875 15.1396 14.3965 15.1396Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.665 3.5C5.135 3.5 3.5 5.233 3.5 7.916V16.084C3.5 18.767 5.135 20.5 7.665 20.5H16.333C18.864 20.5 20.5 18.767 20.5 16.084V7.916C20.5 5.233 18.864 3.5 16.334 3.5H7.665ZM16.333 22H7.665C4.276 22 2 19.622 2 16.084V7.916C2 4.378 4.276 2 7.665 2H16.334C19.723 2 22 4.378 22 7.916V16.084C22 19.622 19.723 22 16.333 22Z"
              fill="black"
            />
          </svg>
        </label>
      </div>
    </div>
  );
};
