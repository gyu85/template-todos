import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

const Wrapper = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default Wrapper;
