import styled from 'styled-components';
import { useThemeState } from 'context/ThemeContext';

import CheckSvg from 'assets/images/common/check_12x9.svg';

interface CheckBoxProps {
  labelText: string;
  htmlFor: string;
}

type ThemeProps = {
  theme: {
    fontSize: string;
    borderColor: string;
    bgColor: string;
  };
};

const WrapCheck = styled.div`
  position: relative;
  word-break: break-all;
  word-wrap: break-word;
`;

const CheckInput = styled.input`
  position: absolute;
  top: 2px;
  left: 0;
  width: 24px;
  height: 24px;
  opacity: 0;

  &:checked + label:before {
    background-color: ${(props: ThemeProps) => props.theme.bgColor};
  }

  &:checked + label:after {
    position: absolute;
    top: 2px;
    left: 0;
    width: 20px;
    height: 20px;
    background: url(${CheckSvg}) no-repeat 50%;
    content: '';
  }
`;

const Label = styled.label`
  display: inline-block;
  padding-left: 28px;
  font-size: ${(props: ThemeProps) => props.theme.fontSize};
  cursor: pointer;

  &:before {
    position: absolute;
    top: 2px;
    left: 0;
    width: 20px;
    height: 20px;
    border: 2px solid ${(props: ThemeProps) => props.theme.borderColor};
    border-radius: 4px;
    box-sizing: border-box;
    content: '';
  }
`;

const CheckBox = ({ labelText, htmlFor }: CheckBoxProps) => {
  const { colors, fontSize } = useThemeState();

  return (
    <WrapCheck>
      <CheckInput
        type='checkbox'
        id={htmlFor}
        theme={{
          bgColor: colors.primary40
        }}
      />
      <Label
        htmlFor={htmlFor}
        theme={{
          fontSize: fontSize.label.medium,
          borderColor: colors.primary40
        }}>
        {labelText}
      </Label>
    </WrapCheck>
  );
};

export default CheckBox;
