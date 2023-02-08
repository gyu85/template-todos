import React, { useReducer, Dispatch, useContext, createContext } from 'react';
import type { ThemeState } from 'types/theme';

const ThemeStateContext = createContext<ThemeState | undefined>(undefined);

type IThemeAction = { type: 'GET' };

type ThemeDispatch = Dispatch<IThemeAction>;

const ThemeDispatchContext = createContext<ThemeDispatch | undefined>(
  undefined
);

const getInitTheme = (): ThemeState => {
  return {
    colors: {
      white: '#FFF',
      primary10: '#21005D',
      primary40: '#6750A4',
      primary90: '#EADDFF',
      secondary10: '#1D192B',
      secondary40: '#625B71',
      secondary90: '#E8DEF8',
      tertiary10: '#31111D',
      tertiary40: '#7D5260',
      tertiary90: '#FFD8E4',
      neutral10: '#1C1B1F',
      neutral99: '#FFFBFE',
      neutralVariant30: '#49454F',
      neutralVariant50: '#79747E',
      neutralVariant80: '#CAC4D0',
      neutralVariant90: '#E7E0EC',
      surface: '#FFFBFE',
      surface1: '#6750A40D',
      surface2: '#6750A414',
      surface3: '#6750A41C',
      surface4: '#6750A41F',
      surface5: '#6750A424',
      error10: '#410E0B',
      error40: '#B3261E',
      error90: '#F9DEDC',
      onSurface12: '#1C1B1F1F',
      onSurface38: '#1C1B1F61'
    },
    fontSize: {
      display: {
        large: '57px',
        medium: '45px',
        small: '36px'
      },
      headline: {
        large: '32px',
        medium: '28px',
        small: '24px'
      },
      label: {
        large: '22px',
        medium: '16px',
        small: '14px'
      },
      body: {
        large: '16px',
        medium: '14px',
        small: '12px'
      }
    }
  };
};

function reducer(state: ThemeState, action: IThemeAction) {
  switch (action.type) {
    case 'GET':
      return state;

    default:
      throw new Error('There is no actions.');
  }
}

export const ThemeContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, getInitTheme());

  return (
    <ThemeDispatchContext.Provider value={dispatch}>
      <ThemeStateContext.Provider value={state}>
        {children}
      </ThemeStateContext.Provider>
    </ThemeDispatchContext.Provider>
  );
};

export const useThemeState = () => {
  const state = useContext(ThemeStateContext);

  if (state) {
    return state;
  } else {
    throw new Error('can not find theme state.');
  }
};

export const useThemeDispatch = () => {
  const dispatch = useContext(ThemeDispatchContext);

  if (dispatch) {
    return dispatch;
  } else {
    throw new Error('can not find theme dispatch.');
  }
};
