import React, { ReactNode } from "react";
import { Flex, FormControlProps, FormControlGroup, Button } from "@/shared/ui";
import { FieldValues, FormState, UseFormRegister } from "react-hook-form";
import { ScrollbarCss } from "@/shared/css";

interface FormProps {
  handleSubmit: Function;
  handleCustomSubmit: Function;
  formControls: FormControlProps[];
  children?: ReactNode;
  buttonProps?: any;
  formProps?: any;
  formControlContainerProps?: any;
  buttonLabel?: string;
  formState: FormState<FieldValues>;
  register: UseFormRegister<FieldValues>;
}
export const Form = ({
  formState,
  register,
  children,
  handleCustomSubmit,
  handleSubmit,
  formControls,
  formProps,
  formControlContainerProps,
  buttonProps,
  buttonLabel,
  ...rest
}: FormProps) => {
  return (
    <Flex
      onSubmit={handleSubmit(handleCustomSubmit)}
      as="form"
      w="100%"
      bg="secondary.500"
      p="8"
      mt={5}
      borderRadius={4}
      flexDir="column"
      alignItems={"center"}
      {...formProps}
    >
      <Flex
        w="100%"
        flexDirection={"column"}
        css={ScrollbarCss}
        {...formControlContainerProps}
      >
        <FormControlGroup
          spacing="4"
          formControls={formControls}
          register={register}
          formState={formState}
          {...rest}
        />
        {children}
      </Flex>
      <Button
        type="submit"
        mt="6"
        backgroundColor="primary.600"
        _hover={{ backgroundColor: "primary.500" }}
        size="lg"
        color="white"
        w={"100%"}
        isLoading={formState?.isSubmitting}
        {...buttonProps}
      >
        {buttonLabel}
      </Button>
    </Flex>
  );
};
