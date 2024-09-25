import { FormLabel as FormLabelChakra, forwardRef } from "@chakra-ui/react";
export const FormLabel_ = ({ children, datatestid, ...rest }: any, ref) => {
  return (
    <FormLabelChakra ref={ref} {...rest} data-testid={datatestid ?? "FormLabelTestId"}>
      {children}
    </FormLabelChakra>
  );
};
export const FormLabel = forwardRef(FormLabel_);
