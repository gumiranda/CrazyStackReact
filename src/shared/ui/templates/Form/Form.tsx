import React, { ReactNode } from "react";
import { Flex, FormControlProps, FormControlGroup, Button } from "@/shared/ui";
import { FieldValues, FormState, UseFormRegister } from "react-hook-form";

interface FormProps {
  handleSubmit: Function;
  handleCustomSubmit: Function;
  formControls: FormControlProps[];
  children?: ReactNode;
  buttonProps?: any;
  formProps?: any;
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
  buttonProps,
  buttonLabel,
  ...rest
}: FormProps) => {
  return (
    <Flex
      onSubmit={handleSubmit(handleCustomSubmit)}
      as="form"
      w="100%"
      bg="purple.800"
      p="8"
      borderRadius={8}
      flexDir="column"
      {...formProps}
    >
      <FormControlGroup
        spacing="4"
        formControls={formControls}
        register={register}
        formState={formState}
        {...rest}
      />
      <Button
        type="submit"
        mt="6"
        backgroundColor="green.600"
        colorScheme="green"
        size="lg"
        isLoading={formState?.isSubmitting}
        {...buttonProps}
      >
        {buttonLabel}
      </Button>
      {children}
    </Flex>
  );
};
