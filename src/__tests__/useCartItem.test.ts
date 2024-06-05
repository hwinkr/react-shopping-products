import { vi } from "vitest";

import { waitFor, act } from "@testing-library/react";

import useToasts from "../hooks/useToasts";

import { initialCartItems } from "../mocks/cartItems/initialCartItems";
import useCartItem from "../hooks/useCartItems/useCartItems";
import { ENDPOINT, PRODUCTS_ERROR_MESSAGES } from "../constants/apis";

import renderTestHook from "./utils/renderTestHook";
import { server } from "../mocks/server";
import { HttpResponse, http } from "msw";

vi.mock("/src/hooks/useToasts.ts");

vi.mock("/src/hooks/useToasts.ts", () => {
  const toastsMock = {
    addToast: vi.fn(),
    removeToast: vi.fn(),
  };

  return {
    default: () => toastsMock,
  };
});

describe("useCartItem", () => {
  const INITIAL_CART_ITEMS_LENGTH = initialCartItems.content.length;

  describe("장바구니 초기 상태", () => {
    it(`장바구니에 담긴 아이템 초기 수량은 ${INITIAL_CART_ITEMS_LENGTH}이다.`, async () => {
      const { result } = renderTestHook(useCartItem);

      await waitFor(() => {
        expect(result.current.selectedCartItemsLength).toBe(INITIAL_CART_ITEMS_LENGTH);
      });
    });
  });

  describe("상품 장바구니 추가", () => {
    it('상품 하단의 "담기" 버튼을 누르면 장바구니에 추가되어야 한다.', async () => {
      const ADD_CART_ITEM_ID = 2;

      const { result } = renderTestHook(useCartItem);

      act(() => {
        result.current.handleAddCartItem(ADD_CART_ITEM_ID);
      });

      await waitFor(() => {
        expect(result.current.selectedCartItemsLength).toBe(INITIAL_CART_ITEMS_LENGTH + 1);
        expect(result.current.checkIsInCart(ADD_CART_ITEM_ID)).toBeTruthy();
      });
    });

    it(`상품을 담는 중 예외가 발생하면 ${PRODUCTS_ERROR_MESSAGES.addingCartItem} 피드백을 토스트 UI를 활용해서 전달해야 한다.`, async () => {
      server.use(
        http.post(ENDPOINT.CART_ITEMS, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const ADD_CART_ITEM_ID = 4;

      const { result } = renderTestHook(useCartItem);

      act(() => {
        result.current.handleAddCartItem(ADD_CART_ITEM_ID);
      });

      await waitFor(() => {
        expect(result.current.selectedCartItemsLength).toBe(INITIAL_CART_ITEMS_LENGTH + 1);
        expect(result.current.checkIsInCart(ADD_CART_ITEM_ID)).toBe(false);

        expect(useToasts().addToast).toHaveBeenCalledWith(PRODUCTS_ERROR_MESSAGES.addingCartItem);
      });
    });
  });

  describe("상품의 장바구니 추가 및 제거", () => {
    it(`상품을 삭제하면 장바구니에서 제거되어야 하고, 남은 장바구니 상품 종류 수는 ${INITIAL_CART_ITEMS_LENGTH - 1}이어야 한다.`, async () => {
      const DELETE_CART_ITEM_ID = 108;

      const { result } = renderTestHook(useCartItem);

      act(() => {
        result.current.handleRemoveCartItem(DELETE_CART_ITEM_ID);
      });

      await waitFor(() => {
        expect(result.current.selectedCartItemsLength).toBe(INITIAL_CART_ITEMS_LENGTH - 1);
        expect(result.current.checkIsInCart(DELETE_CART_ITEM_ID)).toBeFalsy();
      });
    });

    it(`상품을 담는 중 예외가 발생하면 ${PRODUCTS_ERROR_MESSAGES.removeCartItem} 피드백을 토스트 UI를 활용해서 전달해야 한다.`, async () => {
      server.use(
        http.delete(ENDPOINT.CART_ITEMS, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const DELETE_CART_ITEM_ID = 2;

      const { result } = renderTestHook(useCartItem);

      act(() => {
        result.current.handleAddCartItem(DELETE_CART_ITEM_ID);
      });

      await waitFor(() => {
        expect(result.current.selectedCartItemsLength).toBe(INITIAL_CART_ITEMS_LENGTH);
        expect(result.current.checkIsInCart(DELETE_CART_ITEM_ID)).toBe(false);

        expect(useToasts().addToast).toHaveBeenCalledWith(PRODUCTS_ERROR_MESSAGES.removeCartItem);
      });
    });
  });
});
