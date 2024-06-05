import { useState, useEffect } from "react";

import useFetch from "../useFetch";

import { addCartItem, getCartItems, removeCartItem } from "../../apis/cart-item";
import { CartItem } from "../../types/cartItem";

import useToasts from "../useToasts";
import { PRODUCTS_ERROR_MESSAGES } from "../../constants/apis";

interface UseCartItemResult {
  error: unknown;
  isLoading: boolean;
  selectedCartItemsLength: number;
  handleAddCartItem: (id: number) => void;
  handleRemoveCartItem: (id: number) => void;
  checkIsInCart: (productId: number) => boolean;
}

export default function useCartItem(): UseCartItemResult {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { fetcher, isLoading, error } = useFetch();

  const { addToast } = useToasts();

  useEffect(() => {
    fetcher(fetchCartItem);
  }, [fetcher, addToast]);

  const fetchCartItem = async () => {
    const cartItems = await getCartItems();

    if (!cartItems) return;

    if (cartItems.totalElements <= 20) {
      setCartItems(cartItems.content);
      return;
    }

    const totalCartItems = await getCartItems(cartItems.totalElements);
    if (totalCartItems) {
      setCartItems(totalCartItems.content);
    }
  };

  const handleAddCartItem = (productId: number) => {
    fetcher(async () => {
      await addCartItem(productId);
      await fetchCartItem();
    }, addToast);
  };

  const handleRemoveCartItem = (cartItemId: number) => {
    const targetCartItem = cartItems.find((item) => item.product.id === cartItemId);
    if (!targetCartItem) {
      addToast(PRODUCTS_ERROR_MESSAGES.fetchingCartItems);
      return;
    }

    fetcher(async () => {
      await removeCartItem(targetCartItem.id);
      await fetchCartItem();
    }, addToast);
  };

  const checkIsInCart = (productId: number) => {
    return cartItems.some((cartItem) => cartItem.product.id === productId);
  };

  const selectedCartItemsLength = cartItems.length;

  return {
    error,
    isLoading,
    selectedCartItemsLength,
    handleAddCartItem,
    handleRemoveCartItem,
    checkIsInCart,
  };
}
