import { Field } from "@/components/ui/field";

export const FormLabel = ({ children, label, datatestid, ...rest }: any) => {
  return (
    <Field {...rest} label={label} data-testid={datatestid ?? "FormLabelTestId"}>
      {children}
    </Field>
  );
};
