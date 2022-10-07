import { createContext, useReducer } from "react";
import { initialstate, reducer } from "./Reducer";

export const contextApi = createContext();

export const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialstate);

  // handle cross to remove item from cartdata
  const handleCross = (itemID) => {
    dispatch({
      type: "remove",
      payload: itemID,
    });
  };

  return (
    <contextApi.Provider
      value={{
        state,
        dispatch,
        handleCross,
      }}
    >
      {children}
    </contextApi.Provider>
  );
};
