import React from 'react';
import Wrapper from 'containers/Wrapper';
import GlobalStyle from 'assets/styles/global';

import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from 'context/UserContext';
import { ModalContextProvider } from 'context/ModalContext';
import { ThemeContextProvider } from 'context/ThemeContext';

import Modal from 'components/modal/index';

function App() {
  return (
    <ThemeContextProvider>
      <ModalContextProvider>
        <UserContextProvider>
          <BrowserRouter>
            <GlobalStyle />
            <Wrapper />
            <Modal />
          </BrowserRouter>
        </UserContextProvider>
      </ModalContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
