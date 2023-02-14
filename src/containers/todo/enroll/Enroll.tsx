import { Fragment } from 'react';

import TextField from 'components/forms/TextField';
import TextArea from 'components/forms/TextArea';
import ButtonTextType from 'components/common/ButtonTextType';

interface TodoEnrollProps {
  todoTitle: string;
  todoContent: string;
  handleChange: (event: React.ChangeEvent<HTMLElement>) => void;
  handleEnroll: (event: React.MouseEvent<HTMLElement>) => void;
}

const Enroll = ({
  todoTitle,
  todoContent,
  handleChange,
  handleEnroll
}: TodoEnrollProps) => {
  return (
    <Fragment>
      <h2>등록하기</h2>
      <TextField
        type='text'
        isLabel={true}
        labelText='Todo 타이틀'
        isError={false}
        errorMessage='todo 제목을 입력해주세요.'
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
    </Fragment>
  );
};

export default Enroll;
