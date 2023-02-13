import { Fragment, useState, useEffect } from 'react';

import TextField from 'components/forms/TextField';
import ButtonTextType from 'components/common/ButtonTextType';

import { useNavigate } from 'react-router-dom';
import { requestSignUp } from 'api/auth';
import { setLocalforage } from 'utils/localforage';

import { isEmailValid, isPasswordValid } from 'utils/validation';
import { useUserDispatch, useUserState } from 'context/UserContext';
import { useModalDispatch } from 'context/ModalContext';

const SignUp = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
  const modalDispatch = useModalDispatch();

  const { isUserLogin } = useUserState();
  const dispatch = useUserDispatch();

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    requestSignUp({
      email: userId,
      password: userPassword
    })
      .then(data => {
        const { message, token } = data;
        setLocalforage('userTodoInfo', { token: token });

        modalDispatch({
          type: 'ALERT',
          content: { message },
          handler: () => {
            dispatch({
              type: 'LOGIN'
            });

            modalDispatch({ type: null, content: null });
          }
        });
      })
      .catch(error => {
        modalDispatch({ type: 'ALERT', content: { message: error } });
        setUserId('');
        setUserPassword('');
        setUserPasswordConfirm('');
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'memberId':
        setUserId(event.target.value);
        break;

      case 'memberPassword':
        setUserPassword(event.target.value);
        break;

      default:
        setUserPasswordConfirm(event.target.value);
    }
  };

  useEffect(() => {
    if (isUserLogin) {
      navigate('/todo/list');
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

        <TextField
          type='password'
          isLabel={true}
          htmlFor='passwordConfirm'
          labelText='비밀번호 확인'
          fieldValue={userPasswordConfirm}
          isError={
            !!userPasswordConfirm && !(userPassword === userPasswordConfirm)
          }
          errorMessage='비밀번호와 다릅니다.'
          onChange={handleChange}
        />

        <ButtonTextType
          type='submit'
          size='full'
          text='SIGNUP'
          style={{ marginTop: '20px' }}
          isDisabled={
            !(
              isEmailValid(userId) &&
              isPasswordValid(userPassword) &&
              userPassword === userPasswordConfirm
            )
          }
        />
      </form>
    </Fragment>
  );
};

export default SignUp;
