import { api } from 'utils/api';
import { APIURL } from 'utils/constant';

export const createTodo = params => {
  return api({
    url: `${APIURL}/todos`,
    method: 'POST',
    params: params
  });
};

export const getTodos = () => {
  return api({
    url: `${APIURL}/todos`
  });
};

export const deleteTodo = todoId => {
  console.log(todoId);
  return api({
    url: `${APIURL}/todos/${todoId}`
  });
};
