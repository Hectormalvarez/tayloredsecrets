import Input from "../../components/UI/Input";

const PasswordField = ({ register }: any) => {
  return (
    <Input
      fieldName="password"
      register={register}
      placeholder="Enter Password Here"
      label="Password to Reveal Secret"
      type="password"
    />
  );
};

export default PasswordField;
