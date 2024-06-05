import { fetchClient } from "./fetchClient";

import { generateBasicToken } from "../utils/generateBasicToken";

import { CartItem } from "../types/cartItem";
import { ENDPOINT, PRODUCTS_ERROR_MESSAGES } from "../constants/apis";

interface CartItemResponse {
  content: CartItem[];
  totalElements: number;
}

export async function getCartItems(totalItemCount?: number): Promise<CartItemResponse | undefined> {
  const token = generateBasicToken();
  const cartItemUrl = createCartItemRequestUrl(totalItemCount);

  const response = await fetchClient<CartItemResponse>({
    url: cartItemUrl,
    method: "GET",
    errorMessage: PRODUCTS_ERROR_MESSAGES.fetchingCartItems,
    token,
  });

  if (response) {
    return {
      content: response.content,
      totalElements: response.totalElements,
    };
  }
}

export async function addCartItem(productId: number) {
  const token = generateBasicToken();
  const body = { productId, quantity: 1 };

  await fetchClient({
    url: ENDPOINT.CART_ITEMS,
    method: "POST",
    errorMessage: PRODUCTS_ERROR_MESSAGES.addingCartItem,
    body,
    token,
  });
}

export async function removeCartItem(cartItemId: number) {
  const token = generateBasicToken();
  const url = ENDPOINT.DELETE_CART_ITEM(cartItemId);

  return await fetchClient({
    url,
    method: "DELETE",
    errorMessage: PRODUCTS_ERROR_MESSAGES.removeCartItem,
    token,
  });
}

function createCartItemRequestUrl(totalElements?: number) {
  const params = new URLSearchParams();

  if (totalElements) params.append("size", String(totalElements));

  return `${ENDPOINT.CART_ITEMS}?${params.toString()}`;
}
