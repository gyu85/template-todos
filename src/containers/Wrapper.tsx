import { Routes, Route, Navigate } from 'react-router-dom';

import Member from 'containers/member/index';
import Login from 'containers/member/Login';
import SignUp from 'containers/member/SignUp';

import Todo from 'containers/todo/index';
import Todos from 'containers/todo/todos/Todos';

const Wrapper = () => {
  return (
    <Routes>
      <Route element={<Member />}>
        <Route
          path='member/login'
          element={<Login />}
        />
        <Route
          path='member/signUp'
          element={<SignUp />}
        />
      </Route>

      <Route
        path='/todo'
        element={<Todo />}>
        <Route
          path='list'
          element={<Todos />}
        />
      </Route>

      <Route
        path='*'
        element={<Navigate to={'auth'} />}
      />

      <Route
        path='*'
        element={<p>잘못 된 페이지 입니다.</p>}
      />
    </Routes>
  );
};

export default Wrapper;
