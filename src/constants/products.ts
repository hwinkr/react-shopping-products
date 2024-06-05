export const PRODUCTS_SIZE = {
  initial: 20,
  perRequest: 4,
} as const;

export const PRODUCT_CATEGORIES = {
  all: "전체",
  fashion: "패션",
  kitchen: "주방용품",
  beverage: "음료",
  electronics: "전자제품",
  fitness: "운동용품",
  books: "도서",
} as const;

export const PRODUCT_SORT_OPTIONS = {
  asc: "낮은 가격순",
  desc: "높은 가격순",
} as const;

export type CategoryKeys = keyof typeof PRODUCT_CATEGORIES;
export type CategoryQueryString = (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES];

export type SortOptionsKeys = keyof typeof PRODUCT_SORT_OPTIONS;
export type SortOptionQueryString =
  (typeof PRODUCT_SORT_OPTIONS)[keyof typeof PRODUCT_SORT_OPTIONS];
