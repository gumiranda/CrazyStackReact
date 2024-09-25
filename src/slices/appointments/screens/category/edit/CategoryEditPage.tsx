"use client";
import { Box } from "@/shared/ui";
import { EditCategoryForm } from "@/slices/appointments/features/category/edit";
import { CategoryProps } from "@/slices/appointments/entidades/category";
type CategoryEditProps = {
  data: CategoryProps;
  id: string;
};
export const CategoryEditPage = ({ data, id }: CategoryEditProps) => {
  const props = { category: data };
  return (
    <>
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <EditCategoryForm {...props} />
      </Box>
    </>
  );
};
