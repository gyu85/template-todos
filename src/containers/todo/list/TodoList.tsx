import styled from 'styled-components';
import type { TodoData } from 'types/todoData';

import { useThemeState } from 'context/ThemeContext';

import CheckBox from 'components/forms/CheckBox';

interface TodoProps {
  todoData: Array<TodoData>;
  showDetail: (event: React.MouseEvent<HTMLElement>) => void;
  handleModify: (event: React.MouseEvent<HTMLElement>) => void;
  deleteCurrentTodo: (event: React.MouseEvent<HTMLElement>) => void;
}

type ThemeProps = {
  theme: {
    borderColor: string;
    hoverColor: string;
  };
};

const Section = styled.section`
  padding-top: 16px;
  border-top: 1px solid ${(props: ThemeProps) => props.theme.borderColor};
`;

const ListTodo = styled.ul`
  overflow: auto;
  max-height: 335px;
  padding: 8px 0 16px;

  & > li {
    padding: 4px;
  }
`;

const AreaButton = styled.div`
  padding: 8px 0 2px 28px;

  & > button {
    &:hover {
      font-weight: bold;
      color: ${(props: ThemeProps) => props.theme.hoverColor};
    }
  }

  & > span {
    padding: 0 8px;
  }
`;

const TodoList = ({
  todoData,
  showDetail,
  handleModify,
  deleteCurrentTodo
}: TodoProps) => {
  const { colors } = useThemeState();
  return (
    <Section theme={{ borderColor: colors.secondary40 }}>
      <h2>리스트</h2>
      <ListTodo>
        {todoData.reduce((target: JSX.Element[], item) => {
          const { title, id } = item;

          target.push(
            <li key={`todo-${id}`}>
              <CheckBox
                labelText={title}
                htmlFor={`check-${id}`}
              />

              <AreaButton theme={{ hoverColor: colors.primary40 }}>
                <button
                  type='button'
                  data-id={id}
                  onClick={showDetail}>
                  상세 보기
                </button>
                <span>|</span>
                <button
                  type='button'
                  data-id={id}
                  onClick={handleModify}>
                  수정
                </button>
                <span>|</span>
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
    </Section>
  );
};

export default TodoList;
