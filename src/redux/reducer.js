const initialState = {
  user: null,
  loading: true,
  products: [],
  cart: [],
};

const reducer = (state = initialState, action) => {
  // console.log(action);

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
