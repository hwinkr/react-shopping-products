import { CategoryKeys, SortOptionsKeys } from "../../constants/products";
import { Product } from "../../types/products";

export interface UseProductResult {
  products: Product[];
  error: unknown;
  isLoading: boolean;
  page: number;
  category: CategoryKeys;
  handleChangeCategory: (selectedCategory: CategoryKeys) => void;
  sortOption: SortOptionsKeys;
  handleChangeSortOption: (selectedSortOption: SortOptionsKeys) => void;
  fetchNextPage: () => void;
}

export interface ProductRequestResult {
  content: Product[];
  last: boolean;
}
