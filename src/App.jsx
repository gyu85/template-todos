import React, { Fragment } from 'react';
import { RouterProvider, Outlet } from 'react-router-dom';

import router from 'routes/routes';

import GlobalStyle from 'assets/styles/global';
import SpoqaHanSansNeo from 'assets/styles/fonts';

function App() {
  return (
    <Fragment>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
      <SpoqaHanSansNeo />
      <GlobalStyle />
    </Fragment>
  );
}

export default App;
