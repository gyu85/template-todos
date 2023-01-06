import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Auth from 'containers/auth/index';
import Login from 'containers/auth/Login';
import SignUp from 'containers/auth/SignUp';

import Todo from 'containers/todo/index';
import TodoList from 'containers/todo/TodoList';
import Detail from 'containers/todo/Detail';
import Edit from 'containers/todo/Edit';

const Wrapper = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/auth'
          element={<Auth />}>
          <Route
            path='login'
            element={<Login />}
          />
          <Route
            path='signUp'
            element={<SignUp />}
          />
        </Route>

        <Route
          path='/todo'
          element={<Todo />}>
          <Route
            path='list'
            element={<TodoList />}
          />
          <Route
            path=':id/detail'
            element={<Detail />}
          />
          <Route
            path=':id/edit'
            element={<Edit />}
          />
        </Route>

        <Route
          path='*'
          element={<Navigate to={'auth'} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Wrapper;
