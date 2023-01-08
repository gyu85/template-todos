const Edit = ({
  editChange,
  editTodoIdValue,
  editTitleValue,
  editContentValue,
  editSave
}) => {
  return (
    <div>
      <h4>TODO 상세 수정</h4>
      <dl>
        <div>
          <dt>
            <label htmlFor='editTitle'>Title</label>
          </dt>
          <dd>
            <input
              type='text'
              name='editTitle'
              value={editTitleValue}
              onChange={editChange}
            />
          </dd>
        </div>
        <div>
          <dt>
            <label htmlFor='editContent'>Content</label>
          </dt>
          <dd>
            <input
              type='text'
              name='editContent'
              value={editContentValue}
              onChange={editChange}
            />
          </dd>
        </div>
      </dl>
      <div>
        <button
          type='button'
          data-id={editTodoIdValue}
          onClick={editSave}>
          수정
        </button>{' '}
        | <button type='button'>취소</button>
      </div>
    </div>
  );
};

export default Edit;
