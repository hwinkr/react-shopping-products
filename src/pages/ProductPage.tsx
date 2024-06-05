import useProducts from "../hooks/useProducts/useProducts";
import useCartItem from "../hooks/useCartItems/useCartItems";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

import NavigationBar from "../components/NavigationBar/NavigationBar";
import SelectBox from "../components/SelectBox/SelectBox";
import ProductItemContainer from "../components/ProductItemContainer/ProductItemContainer";

import {
  CategoryKeys,
  SortOptionsKeys,
  PRODUCT_CATEGORIES,
  PRODUCT_SORT_OPTIONS,
} from "../constants/products";

import * as Styled from "./ProductPage.style";

export default function ProductPage() {
  const {
    products,
    error: productError,
    isLoading: isProductLoading,
    fetchNextPage,
    category,
    handleChangeCategory,
    sortOption,
    handleChangeSortOption,
  } = useProducts();

  const { handleAddCartItem, handleRemoveCartItem, selectedCartItemsLength, checkIsInCart } =
    useCartItem();

  const observerRef = useIntersectionObserver<HTMLDivElement>(fetchNextPage);

  return (
    <>
      <NavigationBar>
        <Styled.ShopHeader>
          SHOP
          <Styled.CartButton />
          {selectedCartItemsLength !== 0 && (
            <Styled.CartItemsNumber>{selectedCartItemsLength}</Styled.CartItemsNumber>
          )}
        </Styled.ShopHeader>
      </NavigationBar>
      <Styled.ShopContent>
        <Styled.ShopTitle>해르 상품 목록</Styled.ShopTitle>
        <Styled.SelectBoxContainer>
          <SelectBox<CategoryKeys>
            options={PRODUCT_CATEGORIES}
            currentOption={category}
            onChange={handleChangeCategory}
          />
          <SelectBox<SortOptionsKeys>
            options={PRODUCT_SORT_OPTIONS}
            currentOption={sortOption}
            onChange={handleChangeSortOption}
          />
        </Styled.SelectBoxContainer>
        <ProductItemContainer
          products={products}
          onAddCartItem={handleAddCartItem}
          onRemoveCartItem={handleRemoveCartItem}
          checkIsInCart={checkIsInCart}
        />
      </Styled.ShopContent>

      <Styled.ObserverTarget
        ref={observerRef}
        $isActive={!isProductLoading && !productError}
      />
    </>
  );
}
