import { Fragment, useState, useEffect } from 'react';

import { createTodo, getTodos } from 'api/todo';
import { getDayYYMMDD } from 'utils/date';

const TodoList = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoContent, setTodoContent] = useState('');
  const [todos, setTodos] = useState([]);

  const handleChange = event => {
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
      .then(data => {
        console.log(data);
        setTodoTitle('');
        setTodoContent('');
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
        {todos.reduce((target, item) => {
          const { title, content, id, createdAt, updatedAt } = item;

          target.push(
            <li key={`todo-${id}`}>
              <h4>{title}</h4>
              <span>{content}</span>
              <div>
                <span>생성: {getDayYYMMDD(createdAt)}</span> |
                <span>수정: {getDayYYMMDD(updatedAt)}</span>
              </div>
              <div>
                <button
                  type='button'
                  data-id={id}>
                  수정
                </button>
                |
                <button
                  type='button'
                  data-id={id}>
                  삭제
                </button>
              </div>
            </li>
          );

          return target;
        }, [])}
      </ul>
    </Fragment>
  );
};

export default TodoList;
