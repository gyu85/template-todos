import { Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useUserDispatch } from 'context/UserContext';
import { getLocalItem } from 'utils/localforage';

const Todo = () => {
  const dispatch = useUserDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getLocalItem('userTodoInfo')
      .then(data => {
        if (data) {
          const { token } = JSON.parse(data);

          dispatch({
            type: 'LOGIN',
            token: token
          });

          navigate('/todo/list');
        } else {
          navigate('login');
        }
      })
      .catch(error => {
        console.error(error);
        navigate('login');
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
