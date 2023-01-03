import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

const Wrapper = () => {
  return (
    <Fragment>
      <h1>app 입니다.</h1>
      <Outlet />
    </Fragment>
  );
};

export default Wrapper;
