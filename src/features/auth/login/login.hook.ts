import { useAuth } from "shared/libs";
import { useLoginLib, SubmitLoginHandler } from "./login.lib";

export const useLogin = () => {
  const { login } = useAuth();
  const { handleSubmit, register, formState } = useLoginLib();
  const handleLogin: SubmitLoginHandler = async (data) => {
    await login(data);
  };
  return { formState, register, handleSubmit, handleLogin };
};
