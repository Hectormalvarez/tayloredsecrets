import type { NextPage } from "next";
import { API } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { createSecret } from "../../src/graphql/mutations";

import { useForm } from "react-hook-form";
import { encrypt } from "../../utils/crypto";
import Input from "../Form/Input";

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
export default function CreateSecretForm(fn: NextPage) {
  const router = useRouter();

  // initialize form
  const {
    register,
    handleSubmit,
    resetField,
    watch,
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
        <PasswordSelect register={register} passwordType={passwordType} />
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

const PasswordSelect = ({ register, passwordType }: any) => {
  return (
    <div className="flex">
      {["password", "pin", "no-password",].map((name) => (
        
      <div className="form-check form-check-inline" key={name}>
        <input
          className={`
            form-check-input form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-full 
            border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 
            checked:border-blue-600 checked:bg-blue-600 focus:outline-none
            ${name === passwordType ? 'active' : ''}
          `}
          type="radio"
          name="inlineRadioOptions"
          id="inlineRadio1"
          value="option1"
          {...register("passwordType")}
        />
        <label
          className="form-check-label inline-block text-gray-800"
          htmlFor="inlineRadio10"
        >
          {name}
        </label>
      </div>
      ))}

    </div>
  );
};
