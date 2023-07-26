import { render, screen } from "@testing-library/react";
import React from "react";
import { FormControlProps, FormControlGroup } from "./FormControlGroup";
import { FieldValues, FormState } from "react-hook-form";

describe("FormControlGroup component", () => {
  const formControls: FormControlProps[] = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
  ];
  const formState: FormState<FieldValues> = {
    isSubmitted: false,
    errors: {},
    isDirty: false,
    isLoading: false,
    isSubmitSuccessful: false,
    isSubmitting: false,
    isValidating: false,
    isValid: false,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
  };
  const register = jest.fn();

  it("renders form controls", () => {
    render(
      <FormControlGroup
        formControls={formControls}
        formState={formState}
        register={register}
        spacing="sm"
      />
    );
    formControls.forEach(({ name, label, type }) => {
      const formControl = screen.getByLabelText(label);
      expect(formControl).toBeInTheDocument();
      expect(formControl).toHaveAttribute("type", type);
      expect(formControl).toHaveAttribute("name", name);
    });
  });
});
