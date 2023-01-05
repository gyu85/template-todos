import { useState } from 'react';
import { requestLogin } from 'api/auth';

import { isEmailValid, isPasswordValid } from 'utils/string';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isEmail, setEmailValid] = useState(false);
  const [isPassword, setPasswordValid] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    requestLogin({
      email: userId,
      password: userPassword
    })
      .then(data => {
        console.log('data', data);
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
