import { useEffect } from "react";
import { useRouter } from "next/router";

import { API } from "aws-amplify";
import { createSecret } from "../../src/graphql/mutations";

import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

import { encrypt } from "../../utils/crypto";
import Input from "../Form/Input";
import PasswordSelect from "../Form/PasswordSelect";
import SecretButton from "../Form/SecretButton";
import SecretPassword from "../Form/SecretPassword";

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
        <SecretPassword register={register} passwordType={passwordType} />
        <SecretButton />
      </div>
    </form>
  );
}

