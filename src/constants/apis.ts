export const BASE_URL = import.meta.env.VITE_API_URL;

export const ENDPOINT = {
  PRODUCT: `${BASE_URL}/products`,
  CART_ITEMS: `${BASE_URL}/cart-items`,
  CART_ITEMS_COUNT: `${BASE_URL}/cart-items/count`,
  DELETE_CART_ITEM: (cartItemId: number) => `${BASE_URL}/cart-items/${cartItemId}`,
} as const;

export const ERROR_MESSAGE = {
  SERVER_ERROR: "서버에 일시적인 문제가 생겼습니다. 잠시 후에 다시 접속해 주세요.",
  AUTHENTICATION_FAILED: "API 인증에 실패했습니다. 관리자에게 문의해 주세요.",
  FETCHING_FAILED: "데이터를 불러오지 못했습니다. 잠시 후에 다시 시도해 주세요.",
  NETWORK_DISCONNECTED: "네트워크 에러가 발생했습니다. 인터넷 연결 상태를 확인해주세요.",
  UNKNOWN_ERROR: "알 수 없는 에러가 발생했습니다. 잠시 후에 다시 시도해주세요.",
} as const;

export const PRODUCTS_ERROR_MESSAGES = {
  fetchingProducts:
    "상품 목록을 가져오는 과정에서 에러가 발생했어요!\n 잠시 후 다시 시도해 주세요.",
  fetchingCartItems:
    "장바구니 목록을 가져오는 과정에서 에러가 발생했어요!\n 잠시 후 다시 시도해 주세요.",
  addingCartItem: "장바구니에 상품을 담는 과정에서 에러가 발생했어요!\n 잠시 후 다시 시도해 주세요",
  removeCartItem:
    "장바구니에서 상품을 삭제하는 과정에서 에러가 발생했어요!\n 잠시 후 다시 시도해 주세요",
  nonExistCartItem: "존재하지 않는 상품은 삭제할 수 없어요!",
} as const;
