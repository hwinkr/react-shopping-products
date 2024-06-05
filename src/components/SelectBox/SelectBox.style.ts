import styled from "styled-components";

import { SelectArrowDown, SelectArrowUp } from "../../assets/";

export const SelectBoxContainer = styled.div`
  width: 125px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
`;

export const SelectButton = styled.button<{
  $isOpened: boolean;
  $isSelected: boolean;
}>`
  position: relative;
  width: 100%;
  height: 36px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  font-size: 14px;
  color: #000000;
  text-align: left;

  &:hover {
    cursor: pointer;
  }

  &:hover,
  &:focus {
    border-color: #999999;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url("${(props) => (props.$isOpened ? SelectArrowUp : SelectArrowDown)}");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const SelectOptionBox = styled.ul`
  position: absolute;
  top: 40px;
  z-index: 10;
  width: 100%;

  border-radius: 2px;
  border: 1px solid #e5e5e5;
  background: #ffffff;
`;

export const SelectOption = styled.li<{ $isSelected: boolean }>`
  font-weight: 400;
  font-size: 14px;
  color: #666666;
  display: block;
  padding: 9px 11px;
  background: ${(props) => (props.$isSelected ? "#F4F4F4" : "#FFFFFF")};

  &:hover,
  &:focus {
    cursor: pointer;
    background: #f4f4f4;
  }
`;
