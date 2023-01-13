import { useReducer, Dispatch, useContext, createContext } from 'react';

interface ILoginInfo {
  isUserLogin: boolean;
}

const UserStateContext = createContext<ILoginInfo | undefined>(undefined);

type ILoginAction = { type: 'LOGIN' };
type UserStateDispatch = Dispatch<ILoginAction>;

const UserStateDispatchContext = createContext<UserStateDispatch | undefined>(
  undefined
);

const initialState = (): ILoginInfo => {
  return {
    isUserLogin: false
  };
};

const reducer = (state: ILoginInfo, action: ILoginAction) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isUserLogin: true
      };

    default:
      return state;
  }
};

export const UserContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState());

  return (
    <UserStateDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserStateDispatchContext.Provider>
  );
};

export const useUserState = () => {
  const state = useContext(UserStateContext);

  if (state) {
    return state;
  } else {
    throw new Error('Can not find User State.');
  }
};

export const useUserDispatch = () => {
  const dispatch = useContext(UserStateDispatchContext);

  if (dispatch) {
    return dispatch;
  } else {
    throw new Error('Can not find user dispatch.');
  }
};
