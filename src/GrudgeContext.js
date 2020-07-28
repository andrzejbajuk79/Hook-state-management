import React, {
  useReducer,
  createContext,
  useContext,
  useCallback
} from 'react';
import id from 'uuid/v4';
import initialState from './initialState';

const ADD_GRUDGES = 'ADD_GRUDGES';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';

export const GrudgeContext = createContext();

const reducer = (state, action) => {
  const { type, payload } = action;
  if (type === ADD_GRUDGES) {
    return [payload, ...state];
  }

  if (type === GRUDGE_FORGIVE) {
    return state.map((grudge) => {
      if (grudge.id !== payload.id) return grudge;
      return { ...grudge, forgiven: !grudge.forgiven };
    });
  }

  return state;
};

export const GrudgeProvider = ({ children }) => {
  const [grudges, dispatch] = useReducer(reducer, initialState);
  const addGrudge = useCallback(
    ({ person, reason }) => {
      dispatch({
        type: ADD_GRUDGES,
        payload: {
          person,
          reason,
          forgiven: false,
          id: id()
        }
      });
    },
    [dispatch]
  );

  const toggleForgiveness = useCallback(
    (id) => {
      dispatch({
        type: GRUDGE_FORGIVE,
        payload: { id }
      });
    },
    [dispatch]
  );
  const value = { addGrudge, toggleForgiveness, grudges };

  return (
    <GrudgeContext.Provider value={value}>{children}</GrudgeContext.Provider>
  );
};

export const useGrudgeState = () => {
  return useContext(GrudgeContext);
};

//React.memo
// useCallback - zwraca calkiem  nowa funkcje, ktora mozez wywolac
// useMemo - wola funkcje, jezeli zmienily sie arametry funkcji,
//           w przeciwnym wypadku jej nie wywoluje
