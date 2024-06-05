import { useCallback, useEffect, useState } from "react";

import useFetch from "../useFetch";
import usePagination from "../usePagination";
import useToasts from "../useToasts";

import { UseProductResult } from "./useProducts.type";
import createProductItemsRequestUrl from "./useProducts.utils";

import { CategoryKeys, SortOptionsKeys } from "../../constants/products";
import { Product } from "../../types/products";

import { getProducts } from "../../apis/products";

export default function useProducts(): UseProductResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<CategoryKeys>("all");
  const [sortOption, setSortOption] = useState<SortOptionsKeys>("asc");

  const { addToast } = useToasts();
  const { fetcher, error, isLoading } = useFetch();
  const { page, setNextPage, resetPage, isLastPage, handleLastPage } = usePagination();

  const url = createProductItemsRequestUrl({ page, category, sortOption });

  const fetchNextPage = useCallback(() => {
    if (isLastPage) return;

    setNextPage();
  }, [isLastPage, setNextPage]);

  const handleChangeCategory = (value: CategoryKeys) => {
    if (category === value) return;

    setProducts([]);
    resetPage();
    setCategory(value);
  };

  const handleChangeSortOption = (selectedSortOption: SortOptionsKeys) => {
    if (sortOption === selectedSortOption) return;

    setProducts([]);
    resetPage();
    setSortOption(selectedSortOption);
  };

  useEffect(() => {
    const updateProductItems = async () => {
      const productItems = await getProducts(url);

      if (productItems) {
        setProducts([...products, ...productItems.content]);
        handleLastPage(productItems.last);
      }
    };

    fetcher(updateProductItems, addToast);
  }, [url]);

  return {
    products,
    error,
    isLoading,
    page,
    fetchNextPage,
    category,
    handleChangeCategory,
    sortOption,
    handleChangeSortOption,
  };
}
