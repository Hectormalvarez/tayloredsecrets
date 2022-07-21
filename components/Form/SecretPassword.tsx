import Input from "./Input";

const SecretPassword: any = ({ register, passwordType }: any) => {
    const pinClasses = `
    inline-block	
    `;
    switch (passwordType) {
      case "passphrase":
        return (
          <Input
            fieldName="password"
            options={{ type: "password", placeholder: "Enter Password" }}
            register={register}
            registerOptions={{ required: true }}
            key="password"
          />
        );
      case "pin":
        return (
          <Input
            fieldName="pin"
            options={{ type: "numeric", placeholder: "Enter Pin", maxLength: 6 }}
            register={register}
            registerOptions={{ required: true, maxLength: 4 }}
            classes={pinClasses}
            key="pin"
          />
        );
      default:
        return;
    }
  };

  export default SecretPassword;