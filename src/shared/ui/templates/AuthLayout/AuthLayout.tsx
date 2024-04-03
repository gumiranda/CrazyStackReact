import { Flex } from "../../atoms";

export const AuthLayout = ({ children, ...rest }: any) => {
  return (
    <Flex bgColor="secondary.600" flexDir={["column", "column", "row"]} {...rest}>
      {children}
    </Flex>
  );
};
