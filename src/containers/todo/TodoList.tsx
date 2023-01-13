import { Fragment, useState, useEffect } from 'react';

import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} from 'api/todo';

import Detail from './Detail';
import Edit from './Edit';

interface Response {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const TodoList = () => {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [todoContent, setTodoContent] = useState<string>('');
  const [todos, setTodos] = useState<Array<Response>>([]);

  const [isDetailShow, setDetailShow] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<any>({});

  const [isEditShow, setEditShow] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [editTodoId, setEditTodoId] = useState<string>('');

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
        setTodos(prevTodos => [...prevTodos, data]);
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

        setTodos((prevTodos: any) => {
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

        setDetailData({ ...data });
        setDetailShow(true);
      })
      .catch(error => {
        alert(error);
      });
  };

  const handleEditModify = () => {
    const { id, title, content } = detailData;
    setDetailShow(false);
    setEditShow(true);

    setEditTitle(title);
    setEditContent(content);
    setEditTodoId(id);
  };

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

    setDetailShow(false);
    setEditShow(true);

    getTodoById(currentTodoId)
      .then(currentTodo => {
        const {
          data: { title, content, id }
        } = currentTodo;

        setEditTitle(title);
        setEditContent(content);
        setEditTodoId(id);
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

        setTodos(prevTodos => {
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

        setTodos([...data]);
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  return (
    <Fragment>
      <h2>내 목록</h2>
      <div>
        <h3>등록하기</h3>
        <dl>
          <div>
            <dt>
              <label htmlFor='todoTitle'>Title</label>
            </dt>
            <dd>
              <input
                type='text'
                name='todoTitle'
                value={todoTitle}
                onChange={handleChange}
              />
            </dd>
          </div>
          <div>
            <dt>
              <label htmlFor='todoContent'>Content</label>
            </dt>
            <dd>
              <input
                type='text'
                name='todoContent'
                value={todoContent}
                onChange={handleChange}
              />
            </dd>
          </div>
        </dl>
        <button
          type='button'
          disabled={!(todoTitle && todoContent)}
          onClick={enrollTodo}>
          등록하기 {todoTitle && todoContent ? 'ACTIVE' : 'DISABLED'}
        </button>
      </div>
      <hr />
      <h3>리스트</h3>
      <ul>
        {todos.reduce((target: JSX.Element[], item: any) => {
          const { title, content, id } = item;

          target.push(
            <li key={`todo-${id}`}>
              <div>
                <h4>{title}</h4>
                <span>{content}</span>
              </div>
              <div>
                <button
                  type='button'
                  data-id={id}
                  onClick={showDetail}>
                  상세 보기
                </button>
                |
                <button
                  type='button'
                  data-id={id}
                  onClick={handleModify}>
                  수정
                </button>
                |
                <button
                  type='button'
                  data-id={id}
                  onClick={deleteCurrentTodo}>
                  삭제
                </button>
              </div>
            </li>
          );

          return target;
        }, [] as JSX.Element[])}
      </ul>
      {isDetailShow && (
        <Detail
          detailData={{ ...detailData }}
          handleEditModify={handleEditModify}
          handleCancel={handleCancel}
        />
      )}
      {isEditShow && (
        <Edit
          editChange={editChange}
          editTodoIdValue={editTodoId}
          editTitleValue={editTitle}
          editContentValue={editContent}
          editSave={editSave}
        />
      )}
    </Fragment>
  );
};

export default TodoList;