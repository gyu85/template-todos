import { useState, useEffect } from 'react';
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
      navigate('/todo/list');
    }
  }, [isUserLogin, navigate]);

  return (
    <div>
      <h2>SignUP</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='memberId'>ID</label>
          <input
            type='text'
            name='memberId'
            value={userId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='memberPassword'>비밀번호</label>
          <input
            type='password'
            name='memberPassword'
            value={userPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor=''>비밀번호 확인</label>
          <input
            type='password'
            name='passwordConfirm'
            value={userPasswordConfirm}
            onChange={handleChange}
          />
        </div>
        <button
          type='submit'
          disabled={!(isEmail && isPassword)}>
          SIGNUP {!(isEmail && isPassword) ? 'disabled' : 'active'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
