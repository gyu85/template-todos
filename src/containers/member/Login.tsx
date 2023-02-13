import { Fragment, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import { requestLogin } from 'api/auth';
import { setLocalforage } from 'utils/localforage';

import TextField from 'components/forms/TextField';
import ButtonTextType from 'components/common/ButtonTextType';

import { isEmailValid, isPasswordValid } from 'utils/validation';
import { useThemeState } from 'context/ThemeContext';
import { useUserDispatch } from 'context/UserContext';
import { useModalDispatch } from 'context/ModalContext';

type ThemeProps = {
  theme: {
    color: string;
    fontSize: string;
    hoverColor: string;
  };
};

const LinkSignUp = styled.div`
  padding-top: 28px;
  text-align: center;
  .link-signup {
    color: ${(props: ThemeProps) => props.theme.color};
    font-size: ${(props: ThemeProps) => props.theme.fontSize};

    &:hover {
      color: ${(props: ThemeProps) => props.theme.hoverColor};
      text-decoration: none;
    }
  }
`;

const Login = () => {
  const { colors, fontSize } = useThemeState();
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();
  const modalDispatch = useModalDispatch();

  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    requestLogin({
      email: userId,
      password: userPassword
    })
      .then(data => {
        const { message, token } = data;
        setLocalforage('userTodoInfo', { token: token });

        alert(message);

        userDispatch({
          type: 'LOGIN'
        });

        navigate('/todo/list');
      })
      .catch(error => {
        // alert(error);

        modalDispatch({ type: 'ALERT', content: { message: error } });

        setUserId('');
        setUserPassword('');
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'memberId':
        setUserId(event.target.value);
        break;
      default:
        setUserPassword(event.target.value);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <TextField
          type='text'
          isLabel={true}
          htmlFor='memberId'
          labelText='아이디'
          fieldValue={userId}
          isError={!!userId && !isEmailValid(userId)}
          errorMessage='이메일 형식으로 입력해주세요.'
          onChange={handleChange}
        />

        <TextField
          type='password'
          isLabel={true}
          htmlFor='memberPassword'
          labelText='비밀번호'
          fieldValue={userPassword}
          isError={!!userPassword && !isPasswordValid(userPassword)}
          errorMessage='영문 특수문자 숫자 조합 8자 이상 입력해주세요.'
          onChange={handleChange}
        />

        <ButtonTextType
          type='submit'
          size='full'
          text='LOGIN'
          style={{ marginTop: '20px' }}
          isDisabled={!(isEmailValid(userId) && isPasswordValid(userPassword))}
        />
      </form>
      <LinkSignUp
        theme={{
          fontSize: fontSize.label.large,
          color: colors.primary40,
          hoverColor: colors.secondary10
        }}>
        <Link
          to='/member/signUp'
          className='link-signup'>
          회원가입
        </Link>
      </LinkSignUp>
    </Fragment>
  );
};

export default Login;
