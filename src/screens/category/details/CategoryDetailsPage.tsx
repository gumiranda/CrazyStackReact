"use client";

import { Box } from "@/shared/ui";
import { CategoryDetails } from "@/entidades/category/details";
import { CategoryProps } from "@/entidades/category";
type CategoryDetailsProps = {
  data: CategoryProps;
  id: string;
};
export const CategoryDetailsPage = ({ data }: CategoryDetailsProps) => {
  const props = { category: data };
  return (
    <>
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <CategoryDetails {...props} />
      </Box>
    </>
  );
};
