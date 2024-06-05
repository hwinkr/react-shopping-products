import styled from "styled-components";

import { CartItemIcon } from "../assets";

export const ShopHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CartButton = styled.button`
  width: 32px;
  height: 32px;
  background: url("${CartItemIcon}") no-repeat center 2px;
  background-size: auto;
  cursor: pointer;
`;

export const CartItemsNumber = styled.div`
  position: absolute;
  top: 27px;
  right: 25px;
  width: 19px;
  height: 19px;
  background: #ffffff;
  color: #000000;
  font-size: 10px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ShopContent = styled.div`
  padding: 100px 24px 24px 24px;
`;

export const ShopTitle = styled.h1`
  font-weight: 700;
  font-size: 24px;
  color: #000000;
`;

export const SelectBoxContainer = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`;

export const ObserverTarget = styled.div<{ $isActive: boolean }>`
  height: 10px;

  display: ${({ $isActive }) => ($isActive ? "block" : "none")};
`;
