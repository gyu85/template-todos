import { lazy } from 'react';

import { useModalState, useModalDispatch } from 'context/ModalContext';

const EditModal = lazy(() => import('components/modal/edit/Edit'));
const DetailModal = lazy(() => import('components/modal/detail/Detail'));
const ConfirmModal = lazy(() => import('components/modal/confirm/Confirm'));
const AlertModal = lazy(() => import('components/modal/alert/Alert'));

const ModalContainer = () => {
  const modalState = useModalState();
  const modalDispatch = useModalDispatch();

  const { type, content, handler } = modalState;

  const handleClose = () => {
    modalDispatch({ type: null, content: null });
  };

  if (!content) {
    return null;
  }

  switch (type) {
    case 'edit':
      return (
        <EditModal
          title={content.title}
          content={content.content}
          onClose={handleClose}
        />
      );
    case 'detail':
      return (
        <DetailModal
          title={content.title}
          content={content.title}
          createdAt={content.createdAt}
          updatedAt={content.createdAt}
          onClose={handleClose}
        />
      );

    case 'confirm':
      return (
        <ConfirmModal
          message={content.message}
          onClose={handleClose}
          handler={handler ? handler : () => null}
        />
      );

    case 'alert':
      return (
        <AlertModal
          message={content.message}
          handler={handler ? handler : handleClose}
        />
      );

    default:
      return null;
  }
};

export default ModalContainer;
