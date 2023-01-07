import React, { useReducer, useContext, createContext } from 'react';

const initState = {
  isUserLogin: false,
  token: null
};

const UserStateContext = createContext(initState);
const UserStateDispatch = createContext({ type: 'LOGIN' });

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isUserLogin: true,
        token: action.token
      };

    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <UserStateDispatch.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserStateDispatch.Provider>
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
  const dispatch = useContext(UserStateDispatch);

  if (dispatch) {
    return dispatch;
  } else {
    throw new Error('Can not find user dispatch.');
  }
};
