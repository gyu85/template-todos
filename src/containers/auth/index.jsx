import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <Fragment>
      <h1>Auth</h1>
      <Outlet />
    </Fragment>
  );
};

export default Auth;
