"use client";
import { Box } from "@/shared/ui";
import { CreateCategoryForm } from "@/features/category/create";

export const CategoryCreatePage = () => {
  return (
    <>
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <CreateCategoryForm />
      </Box>
    </>
  );
};
