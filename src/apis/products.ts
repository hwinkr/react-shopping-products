import { PRODUCTS_ERROR_MESSAGES } from "../constants/apis";
import { ProductRequestResult } from "../hooks/useProducts/useProducts.type";
import { fetchClient } from "./fetchClient";

export async function getProducts(url: string) {
  const response = await fetchClient<ProductRequestResult>({
    url,
    method: "GET",
    errorMessage: PRODUCTS_ERROR_MESSAGES.fetchingProducts,
  });

  return response;
}
