import { CartItem } from "../../types/cartItem";

export interface UseCartItemResult {
  error: unknown;
  isLoading: boolean;
  selectedCartItemsLength: number;
  handleAddCartItem: (id: number) => Promise<void>;
  handleRemoveCartItem: (id: number) => Promise<void>;
  checkIsInCart: (productId: number) => boolean;
}

export interface CartItemResponse {
  content: CartItem[];
  totalElements: number;
}
