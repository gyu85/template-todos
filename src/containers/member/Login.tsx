import { Fragment, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import { requestLogin } from 'api/auth';
import { setLocalforage } from 'utils/localforage';

import TextField from 'components/forms/TextField';
import ButtonTextType from 'components/common/ButtonTextType';

import { isEmailValid, isPasswordValid } from 'utils/validation';
import { useUserDispatch, useUserState } from 'context/UserContext';
import { useThemeState } from 'context/ThemeContext';

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
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isEmail, setEmailValid] = useState(false);
  const [isPassword, setPasswordValid] = useState(false);

  const dispatch = useUserDispatch();
  const { isUserLogin } = useUserState();

  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    requestLogin({
      email: userId,
      password: userPassword
    })
      .then(data => {
        const { message, token } = data;
        setLocalforage('userTodoInfo', { token: token });

        alert(message);

        dispatch({
          type: 'LOGIN'
        });

        navigate('/todo/list');
      })
      .catch(error => {
        alert(error);
        setUserId('');
        setUserPassword('');
        setEmailValid(false);
        setPasswordValid(false);
      });
  };

  const handleChange = (event: any) => {
    switch (event.target.name) {
      case 'memberId':
        setUserId(event.target.value);
        setEmailValid(isEmailValid(event.target.value));
        break;
      default:
        setUserPassword(event.target.value);
        setPasswordValid(isPasswordValid(event.target.value));
    }
  };

  useEffect(() => {
    // navigate('/todo/list');
    // eslint-disable-next-line
  }, [isUserLogin]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <TextField
          type='text'
          isLabel={true}
          htmlFor='memberId'
          labelText='아이디'
          fieldValue={userId}
          isError={false}
          onChange={handleChange}
        />

        <TextField
          type='password'
          isLabel={true}
          htmlFor='memberPassword'
          labelText='비밀번호'
          fieldValue={userPassword}
          isError={false}
          onChange={handleChange}
        />

        <ButtonTextType
          type='submit'
          size='full'
          text='LOGIN'
          onClick={() => console.log('로그인 핸들러 추가')}
          style={{ marginTop: '20px' }}
          isDisabled={!(isEmail && isPassword)}
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
