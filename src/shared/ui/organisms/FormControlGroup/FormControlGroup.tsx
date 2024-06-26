import { Stack } from "@/shared/ui/atoms";
import { FormControl } from "@/shared/ui/molecules";
import { FieldValues, FormState, UseFormRegister } from "react-hook-form";
export interface FormControlProps {
  name: string;
  label: string;
  type: string;
}
interface FormControlGroupProps {
  formState: FormState<FieldValues>;
  register: UseFormRegister<FieldValues>;
  spacing?: string;
  formControls: FormControlProps[];
}
export const FormControlGroup = ({
  spacing,
  formControls = [],
  formState,
  register,
}: FormControlGroupProps) => {
  return (
    <Stack spacing={spacing} data-testid="FormControlGroupTestId">
      {formControls?.map?.(
        ({ label = "", name = "defaultName", type = "text", ...rest }, index: number) => (
          <FormControl
            key={index}
            label={label}
            type={type}
            error={formState?.errors?.[name]}
            {...rest}
            {...register(name)}
            name={name}
            autoComplete="off"
          />
        )
      )}
    </Stack>
  );
};
