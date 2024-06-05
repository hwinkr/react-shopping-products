import { useState } from "react";
import * as Styled from "./SelectBox.style";

interface SelectBoxProps<T extends string> {
  currentOption: T;
  options: Record<T, string>;
  onChange: (value: T) => void;
  autoFocus?: boolean;
}

export default function SelectBox<T extends string>({
  currentOption,
  options,
  onChange,
  autoFocus,
}: SelectBoxProps<T>) {
  const currentValue = options[currentOption];

  const [isOpened, setIsOpened] = useState(false);

  const handleOptionBox = () => setIsOpened((prevState) => !prevState);

  const handleOptionValue = (value: T) => {
    onChange(value);
    handleOptionBox();
  };

  return (
    <Styled.SelectBoxContainer>
      <Styled.SelectButton
        $isOpened={isOpened}
        $isSelected={!!currentValue}
        onClick={handleOptionBox}
        autoFocus={autoFocus ?? false}
      >
        {currentValue}
      </Styled.SelectButton>
      {isOpened && (
        <Styled.SelectOptionBox>
          {(Object.entries(options) as [T, string][]).map(([key, value]) => (
            <Styled.SelectOption
              key={key}
              $isSelected={value === currentValue}
              onClick={() => handleOptionValue(key as T)}
            >
              {value}
            </Styled.SelectOption>
          ))}
        </Styled.SelectOptionBox>
      )}
    </Styled.SelectBoxContainer>
  );
}
