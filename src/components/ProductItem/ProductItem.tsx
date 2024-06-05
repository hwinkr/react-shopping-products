import { Product } from '../../types/products';
import { AddToCartIcon, RemoveFromCartIcon } from '../../assets';

import * as Styled from './ProductItem.style';

interface ProductProps {
  product: Product;
  isInCart: boolean;
  onClick: () => void;
}

export default function ProductItem({ product, isInCart, onClick }: ProductProps) {
  return (
    <Styled.ProductItemBox>
      <Styled.ProductImage $imageUrl={product.imageUrl} />
      <Styled.ProductContentBox>
        <Styled.ProductDescriptionBox>
          <h2>{product.name}</h2>
          {product.price.toLocaleString('ko-KR')}원
        </Styled.ProductDescriptionBox>
        <Styled.ProductFooter>
          <Styled.ProductCartButton
            $isInCart={isInCart}
            onClick={onClick}
          >
            <img src={isInCart ? RemoveFromCartIcon : AddToCartIcon} />
            {isInCart ? '빼기' : '담기'}
          </Styled.ProductCartButton>
        </Styled.ProductFooter>
      </Styled.ProductContentBox>
    </Styled.ProductItemBox>
  );
}
