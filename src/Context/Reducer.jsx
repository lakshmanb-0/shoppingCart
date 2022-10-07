export const initialstate = {
  cartdata: [],
  subtotal: [],
};
export const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case "adddata": {
      return {
        ...state,
        cartdata: action.payload,
      };
    }
    case "remove": {
      return {
        ...state,
        cartdata: state.cartdata.filter((item) => item.id !== action.payload),
      };
    }
    case "subtotal": {
      return {
        ...state,
        subtotal: [...state.subtotal, action.payload],
      };
    }
    case "removesubtotal": {
      state.subtotal.splice(state.subtotal.indexOf(action.payload), 1);
      return {
        ...state,
        subtotal: state.subtotal,
      };
    }
    default: {
      return state;
    }
  }
};
