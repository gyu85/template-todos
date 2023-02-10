import { Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import HeadLine from 'components/common/HeadLine';

import { useUserDispatch } from 'context/UserContext';
import { getLocalItem } from 'utils/localforage';

const SectionContainer = styled.section`
  padding: 8px 16px 28px;
  margin-top: 16px;
  border-radius: 4px;
  background-color: #fff;
`;

const Todo = () => {
  const dispatch = useUserDispatch();
  const navigate = useNavigate();
  const localItem = getLocalItem('userTodoInfo');

  useEffect(() => {
    localItem.then(item => {
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
      <HeadLine headerText='TODO' />
      <SectionContainer>
        <Outlet />
      </SectionContainer>
    </Fragment>
  );
};

export default Todo;
