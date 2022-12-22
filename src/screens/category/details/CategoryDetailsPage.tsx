import { Box, Head } from "shared/ui";
import { CategoryDetails } from "entidades/category/details";
import { CategoryProps } from "entidades/category";
type CategoryDetailsProps = {
  data: CategoryProps;
  id: string;
};
export const CategoryDetailsPage = ({ data, id }: CategoryDetailsProps) => {
  const props = { category: data };
  return (
    <>
      <Head
        title={"Belezix Admin | Categorias"}
        description="Página de detalhes de categorias do painel de Admin Belezix"
      />
      <Box flex="1" borderRadius={8} bg="purple.800" p="8">
        <CategoryDetails {...props} />
      </Box>
    </>
  );
};
