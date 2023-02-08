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

  const modal = useModalDispatch();

  const handleChange = (event: any) => {
    switch (event.target.name) {
      case 'todoTitle':
        setTodoTitle(event.target.value);
        break;
      default:
        setTodoContent(event.target.value);
    }
  };

  const enrollTodo = () => {
    createTodo({
      title: todoTitle,
      content: todoContent
    })
      .then(updatedData => {
        const { data } = updatedData;
        // setTodoData(prevTodos => [...prevTodos, data]);
        setTodoTitle('');
        setTodoContent('');
      })
      .catch(error => {
        alert(error);
      });
  };

  const deleteCurrentTodo = (event: any) => {
    const currentId = event.target.dataset.id;

    deleteTodo(currentId)
      .then(() => {
        alert('해당 todo가 삭제 되었습니다.');

        setTodoData((prevTodos: any) => {
          return prevTodos.reduce((acumulate: any, current: Response) => {
            const { id } = current;

            if (id !== currentId) {
              acumulate.push(current);
            }

            return acumulate;
          }, []);
        });
      })
      .catch(error => {
        alert(error);
      });
  };

  const showDetail = (event: any) => {
    const currentid = event.target.dataset.id;

    getTodoById(currentid)
      .then(currentTodo => {
        const { data } = currentTodo;
        modal({ type: 'DETAIL', content: data });
      })
      .catch(error => {
        alert(error);
      });
  };

  const handleEditModify = () => {};

  const handleCancel = () => {
    setDetailData({});
    setDetailShow(false);
  };

  const editChange = (event: any) => {
    switch (event.target.name) {
      case 'editTitle':
        setEditTitle(event.target.value);
        break;

      default:
        setEditContent(event.target.value);
    }
  };

  const handleModify = (event: any) => {
    const currentTodoId = event.target.dataset.id;

    getTodoById(currentTodoId)
      .then(currentTodo => {
        const { data } = currentTodo;

        modal({ type: 'EDIT', content: data });
      })
      .catch(error => {
        alert(error);
      });
  };

  const editSave = (event: any) => {
    const currentId = event.target.dataset.id;

    updateTodo({
      todoId: currentId,
      params: {
        title: editTitle,
        content: editContent
      }
    })
      .then(updatedData => {
        const {
          data: { id: currentId, title, content, createdAt, updatedAt }
        } = updatedData;

        setTodoData(prevTodos => {
          return prevTodos.reduce((acumulate: any, current: Response) => {
            const { id } = current;

            if (id === currentId) {
              current.title = title;
              current.content = content;
              current.createdAt = createdAt;
              current.updatedAt = updatedAt;
            }

            acumulate.push(current);

            return acumulate;
          }, []);
        });

        setEditShow(false);
        setEditTitle('');
        setEditContent('');
        setEditTodoId('');
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
          onClick={() => console.log('TODOS 등록하기 핸들러 추가')}
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
