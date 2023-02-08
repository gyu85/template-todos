import styled from 'styled-components';
import type { TodoDetails } from 'types/todoData';

import { useThemeState } from 'context/ThemeContext';
import { useModalDispatch } from 'context/ModalContext';

import Container from '../common/Container';
import ButtonTextType from 'components/common/ButtonTextType';
import { getDayYYMMDD } from 'utils/date';

type ThemeProps = {
  theme: {
    bgColor: string;
    borderColor: string;
    fontSize: string;
  };
};

const DetailContent = styled.div`
  font-size: ${(props: ThemeProps) => props.theme.fontSize};
  word-break: break-all;

  & > p {
    padding-top: 4px;
  }
`;

const DetailDate = styled.div`
  padding: 8px 0 4px;
  font-size: ${(props: ThemeProps) => props.theme.fontSize};
  text-align: right;
`;

const Detail = ({
  title,
  content,
  createdAt,
  updatedAt,
  onClose
}: TodoDetails) => {
  const modalDispatch = useModalDispatch();
  const { colors, fontSize } = useThemeState();

  const handleTest = () => {
    modalDispatch({
      type: 'EDIT',
      content: { title: title, content: content }
    });
  };

  return (
    <Container modalTitle='TODO 상세'>
      <div className='modal-body'>
        <DetailContent theme={{ fontSize: fontSize.label.medium }}>
          <strong>{title}</strong>
          <p>{content}</p>
        </DetailContent>
        <DetailDate theme={{ fontSize: fontSize.label.small }}>
          생성: {getDayYYMMDD(createdAt)} | 수정: {getDayYYMMDD(updatedAt)}
        </DetailDate>
      </div>
      <div className='modal-footer'>
        <ButtonTextType
          type='button'
          size='small'
          text='수정'
          isDisabled={false}
          onClick={handleTest}
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
    </Container>
  );
};

export default Detail;
