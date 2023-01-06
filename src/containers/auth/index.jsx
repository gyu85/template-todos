import { Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useUserDispatch } from 'context/UserContext';
import { getLocalItem } from 'utils/localforage';

const Auth = () => {
  const dispatch = useUserDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getLocalItem('token')
      .then(token => {
        if (token) {
          dispatch({
            type: 'LOGIN'
          });

          navigate('/todo/list');
        } else {
          navigate('login');
        }
      })
      .catch(error => {
        console.error(error);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <h1>AUTH</h1>
      <Outlet />
    </Fragment>
  );
};

export default Auth;
