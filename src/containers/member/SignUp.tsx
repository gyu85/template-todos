import { Fragment, useState, useEffect } from 'react';

import TextField from 'components/forms/TextField';
import ButtonTextType from 'components/common/ButtonTextType';

import { useNavigate } from 'react-router-dom';
import { requestSignUp } from 'api/auth';
import { setLocalforage } from 'utils/localforage';

import { isEmailValid, isPasswordValid } from 'utils/validation';
import { useUserDispatch, useUserState } from 'context/UserContext';

const SignUp = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordConfirm, setUserPasswordConfirm] = useState('');

  const [isEmail, setEmailValid] = useState(false);
  const [isPassword, setPasswordValid] = useState(false);

  const { isUserLogin } = useUserState();
  const dispatch = useUserDispatch();

  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    requestSignUp({
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
      })
      .catch(error => {
        alert(error);
        setUserId('');
        setUserPassword('');
        setUserPasswordConfirm('');

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

      case 'memberPassword':
        setUserPassword(event.target.value);
        setPasswordValid(
          isPasswordValid(event.target.value) &&
            event.target.value === userPasswordConfirm
        );
        break;

      default:
        setUserPasswordConfirm(event.target.value);
        setPasswordValid(
          isPasswordValid(event.target.value) &&
            event.target.value === userPassword
        );
    }
  };

  useEffect(() => {
    if (isUserLogin) {
      // navigate('/todo/list');
      console.log('여기 수정');
    }
  }, [isUserLogin, navigate]);

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

        <TextField
          type='password'
          isLabel={true}
          htmlFor='passwordConfirm'
          labelText='비밀번호 확인'
          fieldValue={userPasswordConfirm}
          isError={false}
          onChange={handleChange}
        />

        <ButtonTextType
          type='submit'
          size='full'
          text='SIGNUP'
          onClick={() => console.log('회원가입 핸들러 추가')}
          style={{ marginTop: '20px' }}
          isDisabled={!(isEmail && isPassword)}
        />
      </form>
    </Fragment>
  );
};

export default SignUp;
