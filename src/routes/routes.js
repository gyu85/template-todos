import { createBrowserRouter } from 'react-router-dom';
import Auth from 'containers/auth';

const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signUp'
  },
  TODO: {
    INDEX: '/todo',
    DETAIL: '/todo/detail/:id',
    EDIT: '/todo/edit/:id'
  }
};

const router = createBrowserRouter([
  {
    path: '/'
  }
]);

export default router;
