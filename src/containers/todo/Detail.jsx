import { getDayYYMMDD } from 'utils/date';

const Detail = ({ detailData, handleEditModify, handleCancel }) => {
  const { title, content, createdAt, updatedAt } = detailData;

  return (
    <div>
      <h3>디테일 상세</h3>
      <div>
        <h4>{title}</h4>
        <p>{content}</p>
        <span>생성: {getDayYYMMDD(createdAt)}</span>|
        <span>수정: {getDayYYMMDD(updatedAt)}</span>
      </div>
      <div>
        <button
          type='button'
          onClick={handleEditModify}>
          수정
        </button>
        |{' '}
        <button
          type='button'
          onClick={handleCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default Detail;
