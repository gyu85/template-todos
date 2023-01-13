import { Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useUserDispatch } from 'context/UserContext';
import { getLocalItem } from 'utils/localforage';

const Todo = () => {
  const dispatch = useUserDispatch();
  const navigate = useNavigate();
  const localItem = getLocalItem('userTodoInfo');

  useEffect(() => {
    localItem.then((item: any) => {
      if (item?.token) {
        dispatch({
          type: 'LOGIN'
        });

        navigate('/todo/list');
      } else {
        navigate('login');
      }
    });

    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <h1>Todo</h1>
      <Outlet />
    </Fragment>
  );
};

export default Todo;
