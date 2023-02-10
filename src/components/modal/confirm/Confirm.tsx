import styled from 'styled-components';

import { useThemeState } from 'context/ThemeContext';

import type { TodoEnroll } from 'types/todoData';

import Container from '../common/Container';
import ButtonTextType from 'components/common/ButtonTextType';

type ThemeProps = {
  theme: {
    fontSize: string;
  };
};

const Message = styled.p`
  font-size: ${(props: ThemeProps) => props.theme.fontSize};
`;

const Confirm = ({ message, handler, onClose }: TodoEnroll) => {
  const { fontSize, colors } = useThemeState();

  return (
    <Container modalTitle='알림'>
      <div className='modal-body'>
        <Message theme={{ fontSize: fontSize.label.medium }}>{message}</Message>
      </div>
      <div className='modal-footer'>
        <ButtonTextType
          type='button'
          size='small'
          text='등록'
          isDisabled={false}
          onClick={handler}
          style={{ margin: '0 8px' }}
        />
        <ButtonTextType
          type='button'
          size='small'
          text='취소'
          isDisabled={false}
          onClick={onClose}
          style={{
            margin: '0 8px',
            color: colors.white,
            backgroundColor: colors.neutralVariant50
          }}
        />
      </div>
    </Container>
  );
};

export default Confirm;
