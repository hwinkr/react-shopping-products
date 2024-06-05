import { waitFor, act } from "@testing-library/react";
import { HttpResponse, http } from "msw";

import { server } from "../mocks/server";
import { ProductsUnfilteredInitial, ProductsUnfilteredLast } from "../mocks/products";

import useProducts from "../hooks/useProducts/useProducts";

import { ENDPOINT, PRODUCTS_ERROR_MESSAGES } from "../constants/apis";
import { PRODUCTS_SIZE } from "../constants/products";

import renderTestHook from "./utils/renderTestHook";

import useToasts from "../hooks/useToasts";

import { vi } from "vitest";

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

describe.skip("useProducts", () => {
  const INITIAL_PAGE = 0;

  describe("상품 목록 조회", () => {
    it("상품 목록을 조회한다.", async () => {
      const { result } = renderTestHook(useProducts);

      await waitFor(() => {
        expect(result.current.products).toHaveLength(PRODUCTS_SIZE.initial);
      });
    });

    it("다음 페이지의 상품 4개를 추가로 불러온다", async () => {
      const { result } = renderTestHook(useProducts);

      await waitFor(() => {
        expect(result.current.products).toHaveLength(PRODUCTS_SIZE.initial);
        expect(result.current.page).toBe(0);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(
          PRODUCTS_SIZE.initial + PRODUCTS_SIZE.perRequest,
        );
        expect(result.current.page).toBe(INITIAL_PAGE + 1);
      });
    });

    it("모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.", async () => {
      const { result } = renderTestHook(useProducts);

      await waitFor(() => {
        expect(result.current.products).toHaveLength(PRODUCTS_SIZE.initial);
      });

      const TOTAL_PRODUCT_LENGTH =
        ProductsUnfilteredInitial.content.length + ProductsUnfilteredLast.content.length;

      const MAX_PAGE = Math.ceil(
        (TOTAL_PRODUCT_LENGTH - PRODUCTS_SIZE.initial) / PRODUCTS_SIZE.perRequest,
      );

      for (let i = 1; i < MAX_PAGE + 1; i++) {
        await waitFor(() => {
          act(() => {
            result.current.fetchNextPage();
          });
        });

        const expectedLength = PRODUCTS_SIZE.initial + i * PRODUCTS_SIZE.perRequest;

        await waitFor(() => {
          expect(result.current.products).toHaveLength(expectedLength);
          expect(result.current.page).toBe(i);
        });
      }

      await act(async () => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(TOTAL_PRODUCT_LENGTH);
        expect(result.current.page).toBe(MAX_PAGE);
      });
    });
  });

  describe("상품 카테코리 필터링", () => {
    it('사용자가 "도서" 카테고리를 선택했다면 "도서" 카테고리의 상품들만 노출되어야 한다.', async () => {
      const { result } = renderTestHook(useProducts);
      const CATEGORY = "books";

      act(() => {
        result.current.handleChangeCategory(CATEGORY);
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(PRODUCTS_SIZE.initial); // 40

        const bookProductsLength = result.current.products.filter(
          (product) => product.category === CATEGORY,
        ).length;
        expect(result.current.products).toHaveLength(bookProductsLength);
      });
    });

    it('사용자가 "도서" 카테고리를 선택한 상태로 스크롤을 내리면, "도서" 카테고리의 다음 순서 상품 4개를 추가로 불러와야 한다.', async () => {
      const { result } = renderTestHook(useProducts);
      const CATEGORY = "books";

      act(() => {
        result.current.handleChangeCategory(CATEGORY);
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(PRODUCTS_SIZE.initial);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(
          PRODUCTS_SIZE.initial + PRODUCTS_SIZE.perRequest,
        );

        const bookProductsLength = result.current.products.filter(
          (product) => product.category === CATEGORY,
        ).length;
        expect(result.current.products).toHaveLength(bookProductsLength);
      });
    });
  });

  describe("상품 가격 정렬", () => {
    it("사용자가 아무런 설정도 하지 않을 경우, 기본 오름차순으로 정렬되어야 한다.", async () => {
      const { result } = renderTestHook(useProducts);

      await waitFor(() => {
        expect(result.current.products).toHaveLength(PRODUCTS_SIZE.initial);

        const PRODUCTS_PRICE_ARRAY = result.current.products.map((product) => product.price);
        const SORTED_PRODUCT_PRICE_ARRAY = [...PRODUCTS_PRICE_ARRAY].sort((a, b) => a - b);

        expect(PRODUCTS_PRICE_ARRAY).toEqual(SORTED_PRODUCT_PRICE_ARRAY);
      });
    });

    it('사용자가 "높은 가격순"으로 변경할 경우, 내림차순으로 정렬되어야 한다.', async () => {
      const { result } = renderTestHook(useProducts);

      act(() => {
        result.current.handleChangeSortOption("desc");
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(PRODUCTS_SIZE.initial);

        const PRODUCTS_PRICE_ARRAY = result.current.products.map((product) => product.price);
        const SORTED_PRODUCT_PRICE_ARRAY = [...PRODUCTS_PRICE_ARRAY].sort((a, b) => b - a);

        expect(PRODUCTS_PRICE_ARRAY).toEqual(SORTED_PRODUCT_PRICE_ARRAY);
      });
    });

    it('사용자가 "높은 가격순"으로 변경한 후, 추가 데이터를 요청하면 새로운 모든 데이터는 기존 상품 데이터들보다 같거나 싸야한다.', async () => {
      const { result } = renderTestHook(useProducts);

      act(() => {
        result.current.handleChangeSortOption("desc");
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(PRODUCTS_SIZE.initial);

        const PRODUCTS_PRICE_ARRAY = result.current.products.map((product) => product.price);
        const SORTED_PRODUCT_PRICE_ARRAY = [...PRODUCTS_PRICE_ARRAY].sort((a, b) => b - a);

        expect(PRODUCTS_PRICE_ARRAY).toEqual(SORTED_PRODUCT_PRICE_ARRAY);
      });

      const LAST_PRODUCT_PRICE = result.current.products[result.current.products.length - 1].price;

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        const TOTAL_PRODUCT_LENGTH = PRODUCTS_SIZE.initial + PRODUCTS_SIZE.perRequest;

        expect(result.current.products).toHaveLength(TOTAL_PRODUCT_LENGTH);

        const ADDITIONAL_PRODUCTS = result.current.products.slice(
          PRODUCTS_SIZE.initial,
          TOTAL_PRODUCT_LENGTH,
        );

        expect(
          ADDITIONAL_PRODUCTS.every((product) => product.price <= LAST_PRODUCT_PRICE),
        ).toBeTruthy();
      });
    });
  });

  describe("상품 목록 조회 로딩 상태", () => {
    it("상품 목록을 조회 할 때, 로딩 초기 상태는 true이다.", () => {
      const { result } = renderTestHook(useProducts);

      expect(result.current.isLoading).toBeTruthy();
    });

    it("상품 목록을 조회가 완료되면, 로딩 상태는 false이다.", async () => {
      const { result } = renderTestHook(useProducts);

      await waitFor(() => {
        expect(result.current.isLoading).toBeFalsy();
      });
    });
  });

  describe("상품 목록 조회 에러 상태", () => {
    it("상품 목록 조회 중 에러가 발생하면, 에러 상태는 true이다.", async () => {
      server.use(
        http.get(ENDPOINT.PRODUCT, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const { result } = renderTestHook(useProducts);

      await waitFor(() => {
        expect(result.current.products).toEqual([]);
        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.error).toBeInstanceOf(Error);
      });
    });

    it("상품 목록 조회 중 에러가 발생하면, 에러 상태는 true이다.", async () => {
      server.use(
        http.get(ENDPOINT.PRODUCT, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const { result } = renderTestHook(useProducts);

      await waitFor(() => {
        expect(result.current.products).toEqual([]);
        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.error).toBeInstanceOf(Error);
      });
    });

    it(`상품 목록 조회 중 에러가 발생하면, ${PRODUCTS_ERROR_MESSAGES.fetchingProducts} 피드백을 토스트 UI를 활용해서 전달해야 한다.`, async () => {
      server.use(
        http.get(ENDPOINT.PRODUCT, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const { result } = renderTestHook(() => {
        return { ...useProducts() };
      });

      await waitFor(() => {
        expect(result.current.products).toEqual([]);
        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.error).toBeInstanceOf(Error);

        expect(useToasts().addToast).toHaveBeenCalledWith(PRODUCTS_ERROR_MESSAGES.fetchingProducts);
      });
    });
  });
});
