import { ENDPOINT } from "../../constants/apis";
import { CategoryKeys, PRODUCTS_SIZE, SortOptionsKeys } from "../../constants/products";

interface CreateUrlProps {
  page: number;
  category: CategoryKeys;
  sortOption: SortOptionsKeys;
}

export default function createProductItemsRequestUrl({
  page,
  category,
  sortOption,
}: CreateUrlProps) {
  const params = new URLSearchParams();

  const pageParams = page === 0 ? page : page + PRODUCTS_SIZE.perRequest;
  params.append("page", String(pageParams));
  params.append("size", String(page === 0 ? 20 : PRODUCTS_SIZE.perRequest));
  params.append("sort", `price,${sortOption}`);
  if (category !== "all") params.append("category", category);

  return `${ENDPOINT.PRODUCT}?${params.toString()}`;
}
