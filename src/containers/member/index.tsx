import { Fragment, useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { useUserDispatch } from 'context/UserContext';
import { getLocalItem } from 'utils/localforage';

import HeadLine from 'components/common/HeadLine';

const SectionContainer = styled.section`
  padding: 8px 16px 28px;
  margin-top: 16px;
  border-radius: 4px;
  background-color: #fff;
`;

const Auth = () => {
  const dispatch = useUserDispatch();
  const navigate = useNavigate();
  const localItem = getLocalItem('userTodoInfo');
  const location = useLocation();
  const [headerText, setHeaderText] = useState('');

  useEffect(() => {
    localItem.then(item => {
      if (item) {
        dispatch({
          type: 'LOGIN'
        });

        navigate('/todo/list');
      } else {
        navigate('/member/login');
      }
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case '/member/login':
        setHeaderText('LOGIN');
        break;
      case '/member/signUp':
        setHeaderText('회원가입');
        break;
    }
  }, [location]);

  return (
    <Fragment>
      <HeadLine headerText={headerText} />
      <SectionContainer>
        <Outlet />
      </SectionContainer>
    </Fragment>
  );
};

export default Auth;
