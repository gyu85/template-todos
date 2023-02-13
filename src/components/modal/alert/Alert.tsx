import styled from 'styled-components';

import { useThemeState } from 'context/ThemeContext';

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

const Alert = ({
  message,
  onClose
}: {
  message: string;
  onClose: () => void;
}) => {
  const { fontSize } = useThemeState();

  return (
    <Container modalTitle='알림'>
      <div className='modal-body'>
        <Message theme={{ fontSize: fontSize.label.medium }}>{message}</Message>
      </div>
      <div className='modal-footer'>
        <ButtonTextType
          type='button'
          size='small'
          text='확인'
          isDisabled={false}
          onClick={onClose}
        />
      </div>
    </Container>
  );
};

export default Alert;
