import { useReducer, Dispatch, useContext, createContext } from 'react';

export interface ModalInfo {
  readonly type: string | null;
  readonly isModalShow: boolean;
  readonly content: {
    [key: string]: string;
  } | null;
  handler?: () => void;
}

const ModalStateContext = createContext<ModalInfo | undefined>(undefined);

type ModalAction = {
  type: 'DETAIL' | 'EDIT' | 'CONFIRM' | null;
  content: { [key: string]: string } | null;
  handler?: () => void;
};

type ModalStateDispatch = Dispatch<ModalAction>;

const ModalStateDispatchContext = createContext<ModalStateDispatch | undefined>(
  undefined
);

const initialState = (): ModalInfo => {
  return {
    type: null,
    isModalShow: false,
    content: null
  };
};

const reducer = (state: ModalInfo, action: ModalAction): ModalInfo => {
  switch (action.type) {
    case 'DETAIL':
      return {
        isModalShow: true,
        type: 'detail',
        content: action.content
      };

    case 'EDIT':
      return {
        isModalShow: true,
        type: 'edit',
        content: action.content
      };

    case 'CONFIRM':
      return {
        isModalShow: true,
        type: 'confirm',
        content: action.content,
        handler: action.handler
      };
    default:
      return { ...state, isModalShow: false, type: null, content: null };
  }
};

export const ModalContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState());

  return (
    <ModalStateDispatchContext.Provider value={dispatch}>
      <ModalStateContext.Provider value={state}>
        {children}
      </ModalStateContext.Provider>
    </ModalStateDispatchContext.Provider>
  );
};

export const useModalState = () => {
  const state = useContext(ModalStateContext);

  if (state) {
    return state;
  } else {
    throw new Error('Can not find UseState.');
  }
};

export const useModalDispatch = () => {
  const dispatch = useContext(ModalStateDispatchContext);

  if (dispatch) {
    return dispatch;
  } else {
    throw new Error('Can not find useDispatch.');
  }
};
