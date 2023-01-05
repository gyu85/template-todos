const handleSubmit = event => {
  event.preventDefault();

  console.dir(event.target);
};

const SignUp = () => {
  return (
    <div>
      <h2>SignUP</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor=''>ID</label>
          <input type='text' />
        </div>
        <div>
          <label htmlFor=''>비밀번호</label>
          <input type='password' />
        </div>
        <button type='submt'>LOGIN</button>
      </form>
    </div>
  );
};

export default SignUp;
