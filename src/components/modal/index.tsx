import { Suspense } from 'react';
import styled from 'styled-components';
import { useThemeState } from 'context/ThemeContext';
import { useModalState } from 'context/ModalContext';

import ModalContainer from './ModalContainer';

type ThemeProps = {
  theme: {
    bgColor: string;
  };
};

const Dimmed = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props: ThemeProps) => props.theme.bgColor};
`;

const Modal = () => {
  const { colors } = useThemeState();
  const { isModalShow } = useModalState();

  return isModalShow ? (
    <Dimmed theme={{ bgColor: colors.onSurface38 }}>
      <Suspense fallback={<p>loading...</p>}>
        <ModalContainer />
      </Suspense>
    </Dimmed>
  ) : null;
};

export default Modal;
