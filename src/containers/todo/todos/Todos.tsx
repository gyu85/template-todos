import { Fragment, useState, useEffect } from 'react';
import { useModalDispatch } from 'context/ModalContext';

import { TodoData } from 'types/todoData';

import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} from 'api/todo';

import Enroll from 'containers/todo/enroll/Enroll';
import TodoList from '../list/TodoList';

interface Response {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Todos = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoContent, setTodoContent] = useState('');
  const [todoData, setTodoData] = useState<Array<Response>>([]);

  const modalDispatch = useModalDispatch();

  const handleChange = (event: any) => {
    switch (event.target.name) {
      case 'todoTitle':
        setTodoTitle(event.target.value);
        break;
      default:
        setTodoContent(event.target.value);
    }
  };

  const handleEnroll = () => {
    const message = '등록 하시겠습니까?';
    modalDispatch({
      type: 'CONFIRM',
      content: { message },
      handler: () => {
        createTodo({ title: todoTitle, content: todoContent }).then(data => {
          const { data: responseData }: { data: Response } = data;
          modalDispatch({ type: null, content: null });
          setTodoData([...todoData, responseData]);
          setTodoTitle('');
          setTodoContent('');
        });
      }
    });
  };

  const deleteCurrentTodo = (event: any) => {
    const message = '삭제 하시겠습니까?';
    const currentId = event.target.dataset.id;

    modalDispatch({
      type: 'CONFIRM',
      content: { message },
      handler: () => console.log('삭제 work')
    });
  };

  const showDetail = (event: any) => {
    const currentid = event.target.dataset.id;

    getTodoById(currentid)
      .then(currentTodo => {
        const { data } = currentTodo;
        modalDispatch({ type: 'DETAIL', content: data });
      })
      .catch(error => {
        alert(error);
      });
  };

  const handleModify = (event: any) => {
    const currentTodoId = event.target.dataset.id;

    getTodoById(currentTodoId)
      .then(currentTodo => {
        const { data } = currentTodo;

        modalDispatch({ type: 'EDIT', content: data });
      })
      .catch(error => {
        alert(error);
      });
  };

  useEffect(() => {
    getTodos()
      .then(todosData => {
        const { data } = todosData;
        setTodoData(data);
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  return (
    <Fragment>
      <Enroll
        todoTitle={todoTitle}
        todoContent={todoContent}
        handleChange={handleChange}
        handleEnroll={handleEnroll}
      />
      <TodoList
        todoData={todoData}
        showDetail={showDetail}
        handleModify={handleModify}
        deleteCurrentTodo={deleteCurrentTodo}
      />
    </Fragment>
  );
};

export default Todos;
