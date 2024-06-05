import { http, HttpResponse } from "msw";
import { ENDPOINT } from "../constants/apis";
import { initialCartItems, newCartItem } from "./cartItems/initialCartItems";

import {
  ProductsUnfilteredInitial,
  ProductsUnfilteredLast,
  ProductsFilteredBooksInitial,
  ProductsFilteredBooksLast,
  ProductsUnfilteredSortedDescInitial,
  ProductsUnfilteredSortedDescLast,
  ProductsFilteredBooksSortedDescInitial,
  ProductsFilteredBooksSortedDescLast,
} from "./products";

interface CartItemRequestBody {
  productId: number;
  quantity: number;
}

export const handlers = [
  http.get(ENDPOINT.PRODUCT, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "0");
    const category = url.searchParams.get("category");
    const sort = url.searchParams.get("sort") || "price,asc";

    if (!category && sort === "price,asc") {
      if (page === 0) return HttpResponse.json(ProductsUnfilteredInitial);

      return HttpResponse.json(ProductsUnfilteredLast);
    }

    if (!category && sort === "price,desc") {
      if (page === 0) return HttpResponse.json(ProductsUnfilteredSortedDescInitial);

      return HttpResponse.json(ProductsUnfilteredSortedDescLast);
    }

    if (category === "books" && sort === "price,asc") {
      if (page === 0) return HttpResponse.json(ProductsFilteredBooksInitial);

      return HttpResponse.json(ProductsFilteredBooksLast);
    }

    if (category === "books" && sort === "price,desc") {
      if (page === 0) return HttpResponse.json(ProductsFilteredBooksSortedDescInitial);

      return HttpResponse.json(ProductsFilteredBooksSortedDescLast);
    }
  }),

  http.get(ENDPOINT.CART_ITEMS, () => {
    return HttpResponse.json(initialCartItems);
  }),

  http.post(ENDPOINT.CART_ITEMS, async ({ request }) => {
    try {
      const { productId } = (await request.json()) as CartItemRequestBody;

      const targetCartItem = newCartItem.find((item) => item.product.id === productId);

      if (targetCartItem) {
        initialCartItems.content.push(targetCartItem);
      }

      return HttpResponse.json(null, { status: 201 });
    } catch (error) {
      console.error("Error processing request:", error);
      return HttpResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }),

  http.delete(`${ENDPOINT.CART_ITEMS}/*`, ({ request }) => {
    const targetId = request.url.split("/").pop();

    if (targetId) {
      initialCartItems.content = initialCartItems.content.filter(
        (item) => item.product.id !== Number(targetId),
      );
    }

    return HttpResponse.json(null, { status: 204 });
  }),
];
