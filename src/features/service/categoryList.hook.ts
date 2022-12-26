import { GetCategorysResponse, getCategorys } from "entidades/category";
import { useState, useEffect } from "react";
export type ServiceFormProps = {
  categoryList: GetCategorysResponse;
};
export const useCategoriesSelect = ({ categoryList }: ServiceFormProps) => {
  const [page, setPage] = useState(1);
  const [categorys, setCategorys] = useState(categoryList?.categorys ?? []);
  const [categorySelected, setCategorySelected] = useState<string>(
    categoryList?.categorys?.[0]?._id ?? ""
  );
  const handleChangeCategorySelected = (event: any) => {
    event.preventDefault();
    setCategorySelected(event.target.value);
  };
  const fetchCategoriesPaginated = async () => {
    if (categoryList?.totalCount > categorys?.length && page > 1) {
      const data = await getCategorys(page, null);
      if (data?.totalCount > categorys?.length) {
        setCategorySelected(data?.categorys?.[0]?._id ?? "");
        setCategorys((prev) => [...prev, ...(data.categorys ?? [])]);
      }
    }
  };
  useEffect(() => {
    setCategorys(categoryList?.categorys ?? []);
  }, [categoryList?.categorys]);
  useEffect(() => {
    if (categorySelected === "loadMore") {
      setPage((prev) => prev + 1);
    }
  }, [categorySelected]);
  useEffect(() => {
    fetchCategoriesPaginated();
  }, [page]);
  return {
    categorySelected,
    setCategorySelected,
    handleChangeCategorySelected,
    categorys,
  };
};
