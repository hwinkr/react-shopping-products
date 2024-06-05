import { styled, css } from 'styled-components';

export const ProductItemBox = styled.article`
  width: 100%;
  height: 224px;
  border-radius: 8px;
`;

export const ProductImage = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 112px;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: url(${({ $imageUrl }) => $imageUrl}) center/cover no-repeat;
`;

export const ProductContentBox = styled.div`
  width: 100%;
  height: 112px;
  padding: 15px 8px 8px;

  display: flex;
  flex-direction: column;
  gap: 27px;

  color: #0a0d13;
`;

export const ProductDescriptionBox = styled.div`
  font-size: 12px;
  font-weight: 500;

  & > h2 {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 8px;
  }
`;

export const ProductFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ProductCartButton = styled.button<{ $isInCart: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 59px;
  height: 24px;
  padding: 8px;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;

  ${({ $isInCart }) => css`
    background-color: ${$isInCart ? '#EAEAEA' : '#000000'};
    color: ${$isInCart ? '#000000' : '#FFFFFF'};
  `}
`;
