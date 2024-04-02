import { Box, Head } from "@/shared/ui";
import { EditCategoryForm } from "@/features/category/edit";
import { CategoryProps } from "@/entidades/category";
type CategoryEditProps = {
  data: CategoryProps;
  id: string;
};
export const CategoryEditPage = ({ data, id }: CategoryEditProps) => {
  const props = { category: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Categorias"}
        description="Página de edição de categorias do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="secondary.500" p="8">
        <EditCategoryForm {...props} />
      </Box>
    </>
  );
};
