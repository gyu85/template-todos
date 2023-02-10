import { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';

import { useModalDispatch } from 'context/ModalContext';

import { TodoData } from 'types/todoData';

import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} from 'api/todo';

import TodoList from '../list/TodoList';
import TextField from 'components/forms/TextField';
import TextArea from 'components/forms/TextArea';
import ButtonTextType from 'components/common/ButtonTextType';

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
  const [todoData, setTodoData] = useState<Array<TodoData>>([]);

  const [isDetailShow, setDetailShow] = useState(false);
  const [detailData, setDetailData] = useState({});

  const [isEditShow, setEditShow] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editTodoId, setEditTodoId] = useState('');

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

  const handleEnroll = () => {
    const message = '등록 하시겠습니까?';
    modalDispatch({
      type: 'CONFIRM',
      content: { message },
      handler: () => console.log('workTest')
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
      <div>
        <h2>등록하기</h2>
        <TextField
          type='text'
          isLabel={true}
          labelText='Todo 타이틀'
          isError={false}
          htmlFor='todoTitle'
          fieldValue={todoTitle}
          onChange={handleChange}
        />
        <TextArea
          isLabel={true}
          labelText='Todo 설명'
          isError={false}
          htmlFor='todoContent'
          fieldValue={todoContent}
          onChange={handleChange}
        />
        <ButtonTextType
          type='button'
          size='full'
          text='등록하기'
          style={{ margin: '20px 0' }}
          onClick={handleEnroll}
          isDisabled={!(todoTitle && todoContent)}
        />
      </div>
      <hr />
      <h2>리스트</h2>
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
