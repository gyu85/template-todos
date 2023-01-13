import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestLogin } from 'api/auth';
import { setLocalforage } from 'utils/localforage';

import { isEmailValid, isPasswordValid } from 'utils/validation';
import { useUserDispatch, useUserState } from 'context/UserContext';

const Login = () => {
  const [userId, setUserId] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [isEmail, setEmailValid] = useState<boolean>(false);
  const [isPassword, setPasswordValid] = useState<boolean>(false);

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
    navigate('/todo/list');

    // eslint-disable-next-line
  }, [isUserLogin]);

  return (
    <div>
      <h2>LOGIN</h2>
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
        <button
          type='submit'
          disabled={!(isEmail && isPassword)}>
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
