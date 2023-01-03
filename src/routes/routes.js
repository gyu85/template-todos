import { createBrowserRouter } from 'react-router-dom';

import Wrapper from 'containers/Wrapper';

import Auth from 'containers/auth/index';
import Login from 'containers/auth/Login';
import SignUp from 'containers/auth/SignUp';

import Todo from 'containers/todo/index';
import TodoList from 'containers/todo/TodoList';
import Detail from 'containers/todo/Detail';
import Edit from 'containers/todo/Edit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Wrapper />,
    children: [
      {
        path: 'auth',
        element: <Auth />,
        children: [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'signUp',
            element: <SignUp />
          }
        ]
      },
      {
        path: 'todo',
        element: <Todo />,
        children: [
          {
            path: 'list',
            element: <TodoList />
          },
          {
            path: ':id/detail',
            element: <Detail />
          },
          {
            path: ':id/edit',
            element: <Edit />
          }
        ]
      }
    ]
  }
]);

export default router;
