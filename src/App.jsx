import React, { Fragment } from 'react';
import { RouterProvider, Outlet } from 'react-router-dom';

import router from 'routes/routes';

import GlobalStyle from 'assets/styles/global';
import SpoqaHanSansNeo from 'assets/styles/fonts';

import { UserContextProvider } from 'context/UserContext';

function App() {
  return (
    <Fragment>
      <UserContextProvider>
        <RouterProvider router={router}>
          <Outlet />
        </RouterProvider>
      </UserContextProvider>
      <SpoqaHanSansNeo />
      <GlobalStyle />
    </Fragment>
  );
}

export default App;
