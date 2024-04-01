import { Box, Head } from "@/shared/ui";
import { CategoryProps } from "@/entidades/category";
import { CreateCategoryForm } from "@/features/category/create";

export const CategoryCreatePage = () => {
  return (
    <>
      <Head
        title={"Belezix Admin | Categorias"}
        description="Página de criação de categorias do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <CreateCategoryForm />
      </Box>
    </>
  );
};
