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
    url: `${APIURL}/todos`,
    method: 'GET'
  });
};

export const getTodoById = todoId => {
  return api({
    url: `${APIURL}/todos/${todoId}`,
    method: 'GET'
  });
};

export const updateTodo = ({ todoId, params }) => {
  console.log(todoId, params);
  return api({
    url: `${APIURL}/todos/${todoId}`,
    method: 'PUT',
    params: params
  });
};

export const deleteTodo = todoId => {
  return api({
    url: `${APIURL}/todos/${todoId}`,
    method: 'DELETE'
  });
};
