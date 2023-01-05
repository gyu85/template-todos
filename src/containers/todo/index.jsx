import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

const Todo = () => {
  return (
    <Fragment>
      <h1>Todo</h1>
      <Outlet />
    </Fragment>
  );
};

export default Todo;
