import styled from 'styled-components';

import { useThemeState } from 'context/ThemeContext';

type HeaderProps = {
  headerText: string;
};

type H1StyleProps = {
  theme: {
    fontSize: string;
    fontColor: string;
    bgColor: string;
  };
};

const H1 = styled.h1`
  display: block;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: ${(props: H1StyleProps) => props.theme.fontSize};
  color: ${(props: H1StyleProps) => props.theme.fontColor};
  background-color: ${(props: H1StyleProps) => props.theme.bgColor};
  text-align: center;
`;

const Header = ({ headerText }: HeaderProps) => {
  const { colors, fontSize } = useThemeState();

  return (
    <H1
      theme={{
        fontSize: fontSize.headline.medium,
        fontColor: colors.neutral10,
        bgColor: colors.white
      }}>
      {headerText}
    </H1>
  );
};

export default Header;
