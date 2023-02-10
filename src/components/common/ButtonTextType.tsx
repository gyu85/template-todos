import styled, { css } from 'styled-components';

import { useThemeState } from 'context/ThemeContext';

import { cssPropertyChange } from 'utils/object';

interface ButtonProps {
  type: 'submit' | 'button';
  size?: 'full' | 'large' | 'medium' | 'small';
  text: string;
  isDisabled: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  style?: {
    [cssProperty: string]: string;
  };
}

type ThemeProps = {
  theme: {
    bgColor: string;
    bgColorDisabled: string;
    colorDisabled: string;
  };

  size?: 'full' | 'large' | 'medium' | 'small';
};

const Button = styled.button<ThemeProps>`
  display: block;
  height: 40px;
  padding: 8px 16px;
  font-weight: bold;
  text-align: center;
  background-color: ${(props: ThemeProps) => props.theme.bgColor};
  border-radius: 100px;

  ${props => {
    const {
      size,
      theme: { styleAdditional }
    } = props;

    let buttonSize = {
      width: ''
    };

    switch (size) {
      case 'full':
        buttonSize.width = '100%';
        break;
      case 'large':
        buttonSize.width = '190px';
        break;
      case 'medium':
        buttonSize.width = '100px';
        break;
      case 'small':
        buttonSize.width = '70px';
        break;
      default:
        buttonSize.width = '100%';
    }

    return css`
      ${{ ...styleAdditional, ...buttonSize }}
    `;
  }}

  &:disabled {
    color: ${(props: ThemeProps) => props.theme.colorDisabled};
    background-color: ${(props: ThemeProps) => props.theme.bgColorDisabled};
    cursor: default;
  }
`;

const ButtonTextType = ({
  type,
  size,
  text,
  isDisabled,
  style,
  onClick
}: ButtonProps) => {
  const { colors } = useThemeState();

  const styleAdditional = cssPropertyChange({ ...style });

  return (
    <Button
      type={type}
      disabled={isDisabled}
      theme={{
        bgColor: colors.secondary90,
        bgColorDisabled: colors.onSurface12,
        colorDisabled: colors.onSurface38,
        styleAdditional
      }}
      onClick={onClick}
      size={size}>
      {text}
    </Button>
  );
};

export default ButtonTextType;
