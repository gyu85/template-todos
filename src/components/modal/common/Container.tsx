import styled from 'styled-components';

import { useThemeState } from 'context/ThemeContext';

interface ContainerProps {
  modalTitle: string;
  children: React.ReactNode;
}

type ThemeProps = {
  theme: {
    bgColor: string;
    borderColor: string;
    fontSize: string;
  };
};

const ModalContent = styled.div`
  position: relative;
  width: 400px;
  border-radius: 8px;
  background-color: ${(props: ThemeProps) => props.theme.bgColor};

  .modal-body {
    padding: 16px 16px 8px;
  }

  .modal-footer {
    display: flex;
    justify-content: center;
    padding: 16px;
    border-top: 1px solid ${(props: ThemeProps) => props.theme.borderColor};
  }
`;

const ModalHeader = styled.div`
  padding: 16px 16px 8px;
  border-bottom: 1px solid ${(props: ThemeProps) => props.theme.borderColor};
`;

const Container = ({ modalTitle, children }: ContainerProps) => {
  const { colors } = useThemeState();

  return (
    <ModalContent theme={{ bgColor: colors.white }}>
      <ModalHeader theme={{ borderColor: colors.neutralVariant50 }}>
        <strong>{modalTitle}</strong>
      </ModalHeader>
      {children}
    </ModalContent>
  );
};

export default Container;
