import styled from 'styled-components';
import type { TodoData } from 'types/todoData';

import CheckBox from 'components/forms/CheckBox';

interface TodoProps {
  todoData: Array<TodoData>;
  showDetail: (event: React.MouseEvent<HTMLElement>) => void;
  handleModify: (event: React.MouseEvent<HTMLElement>) => void;
  deleteCurrentTodo: (event: React.MouseEvent<HTMLElement>) => void;
}

const ListTodo = styled.ul`
  overflow: auto;
  max-height: 335px;
  padding: 8px 0 16px;

  & > li {
    padding: 4px;
  }
`;

const AreaButton = styled.div`
  padding: 6px 0 2px;
`;

const TodoList = ({
  todoData,
  showDetail,
  handleModify,
  deleteCurrentTodo
}: TodoProps) => {
  return (
    <ListTodo>
      {todoData.reduce((target: JSX.Element[], item) => {
        const { title, id } = item;

        target.push(
          <li key={`todo-${id}`}>
            <CheckBox
              labelText={title}
              htmlFor={`check-${id}`}
            />

            <AreaButton>
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
            </AreaButton>
          </li>
        );

        return target;
      }, [] as JSX.Element[])}
    </ListTodo>
  );
};

export default TodoList;
