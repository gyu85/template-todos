import React, { Fragment } from 'react';
import Wrapper from 'containers/Wrapper';
import GlobalStyle from 'assets/styles/global';
import SpoqaHanSansNeo from 'assets/styles/fonts';

import { UserContextProvider } from 'context/UserContext';

function App() {
  return (
    <Fragment>
      <UserContextProvider>
        <Wrapper />
      </UserContextProvider>
      <SpoqaHanSansNeo />
      <GlobalStyle />
    </Fragment>
  );
}

export default App;
