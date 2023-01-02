import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Form } from "./Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
type TestFormData = {
  email: string;
  password: string;
};
type SubmitTestHandler = SubmitHandler<TestFormData>;
const testFormSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});
const useTestLib = () => {
  const form = useForm({
    resolver: yupResolver(testFormSchema),
  });
  return { ...form };
};
const useTest = () => {
  const { register, handleSubmit, formState } = useTestLib();
  const handleCustomSubmit: SubmitTestHandler = async (data) => {};
  return { register, handleSubmit, formState, handleCustomSubmit };
};
function TestForm() {
  const { formState, register, handleSubmit, handleCustomSubmit } = useTest();
  const formProps = {
    formState,
    register,
    handleSubmit,
    handleCustomSubmit,
    buttonLabel: "Entrar",
    formControls: [
      { name: "email", label: "Email", type: "email" },
      { name: "password", label: "Senha", type: "password" },
    ],
  };
  return <Form {...formProps} />;
}
describe("<Form/>", () => {
  it("should render the Form component", () => {
    renderWithTheme(<TestForm />);
    expect(screen.getByTestId("FlexTestId")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });
});
