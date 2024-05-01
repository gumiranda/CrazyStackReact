import { useAuth } from "@/shared/libs";
import { useSignupLib, SubmitSignupHandler } from "./signup.lib";

export const useSignup = () => {
  const { signup = () => {} } = useAuth() || {};
  const { handleSubmit, register, formState, watch } = useSignupLib();
  const cnpjActive = watch("cnpjActive");
  const handleSignup: SubmitSignupHandler = async (data) => {
    await signup(data);
  };
  return { formState, register, handleSubmit, handleSignup, cnpjActive };
};
