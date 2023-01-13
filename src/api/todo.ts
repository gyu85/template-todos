import { api } from 'utils/api';

export const createTodo = (params: any) => {
  return api({
    url: `${process.env.REACT_APP_APIURL}/todos`,
    method: 'POST',
    params: params
  });
};

export const getTodos = () => {
  return api({
    url: `${process.env.REACT_APP_APIURL}/todos`,
    method: 'GET'
  });
};

export const getTodoById = (todoId: string) => {
  return api({
    url: `${process.env.REACT_APP_APIURL}/todos/${todoId}`,
    method: 'GET'
  });
};

interface IUpdateTodoParams {
  todoId: string;
  params: any;
}

export const updateTodo = ({ todoId, params }: IUpdateTodoParams) => {
  return api({
    url: `${process.env.REACT_APP_APIURL}/todos/${todoId}`,
    method: 'PUT',
    params: params
  });
};

export const deleteTodo = (todoId: string) => {
  return api({
    url: `${process.env.REACT_APP_APIURL}/todos/${todoId}`,
    method: 'DELETE'
  });
};
