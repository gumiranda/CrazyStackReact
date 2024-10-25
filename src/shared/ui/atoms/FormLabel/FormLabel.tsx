import { Field } from "@/components/ui/field";

export const FormLabel = ({ children, label, datatestid, ...rest }: any, ref) => {
  return (
    <Field
      ref={ref}
      {...rest}
      label={label}
      data-testid={datatestid ?? "FormLabelTestId"}
    >
      {children}
    </Field>
  );
};
