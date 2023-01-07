import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestLogin } from 'api/auth';
import { setLocalforage } from 'utils/localforage';

import { isEmailValid, isPasswordValid } from 'utils/string';
import { useUserDispatch, useUserState } from 'context/UserContext';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isEmail, setEmailValid] = useState(false);
  const [isPassword, setPasswordValid] = useState(false);

  const { isUserLogin } = useUserState();
  const dispatch = useUserDispatch();

  const navigate = useNavigate();

  const handleSubmit = event => {
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
          type: 'LOGIN',
          token: token
        });
      })
      .catch(error => {
        alert(error);
        setUserId('');
        setUserPassword('');
        setEmailValid(false);
        setPasswordValid(false);
      });
  };

  const handleChange = event => {
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
    if (isUserLogin) {
      navigate('/todo/list');
    }
    // eslint-disable-next-line
  }, []);

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
