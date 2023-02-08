import { Fragment } from 'react';
import { useThemeState } from 'context/ThemeContext';

import type { TodoEditData } from 'types/todoData';

import Container from '../common/Container';
import TextField from 'components/forms/TextField';
import TextArea from 'components/forms/TextArea';
import ButtonTextType from 'components/common/ButtonTextType';

const Edit = ({ title, content, onClose }: TodoEditData) => {
  const { colors } = useThemeState();

  return (
    <Container modalTitle='Todo 수정'>
      <Fragment>
        <div className='modal-body'>
          <TextField
            type='text'
            htmlFor='editTitle'
            isLabel={true}
            labelText='todo 타이틀'
            fieldValue={title}
            isError={false}
            onChange={() => console.log('test')}
          />
          <TextArea
            htmlFor='editContent'
            isLabel={true}
            labelText='Todo 상새'
            fieldValue={content}
            isError={false}
            onChange={() => {
              console.log('work');
            }}
          />
        </div>

        <div className='modal-footer'>
          <ButtonTextType
            type='button'
            size='small'
            text='완료'
            isDisabled={false}
            onClick={() => console.log('work')}
            style={{ margin: '0 8px' }}
          />
          <ButtonTextType
            type='button'
            size='small'
            text='닫기'
            isDisabled={false}
            onClick={onClose}
            style={{
              margin: '0 8px',
              color: colors.white,
              backgroundColor: colors.neutralVariant50
            }}
          />
        </div>
      </Fragment>
    </Container>
  );
};

export default Edit;
