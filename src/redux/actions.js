import { db } from "../firebase.js";

export const loggedIn = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const setLoading = (loading) => {
  return {
    type: "SET_LOADING",
    payload: loading,
  };
};

export const setCart = () => {
  return function (dispatch) {
    const cartRef = db.collection("cart");
    cartRef.onSnapshot((querySnapshot) => {
      const cartItems = [];
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        if (productData.userEmail === localStorage.getItem("email")) {
          cartItems.push(productData);
        }
      });
      dispatch({
        type: "SET_CART",
        payload: cartItems,
      });
    });
  };
};

export const setProducts = () => {
  return function (dispatch) {
    const productsRef = db.collection("products");
    productsRef.onSnapshot((querySnapshot) => {
      const productItems = [];
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        if (true || productData.userEmail === localStorage.getItem("email")) {
          productItems.push(productData);
        }
      });
      dispatch({
        type: "SET_PRODUCTS",
        payload: productItems,
      });
      // setTimeout(() => {
      dispatch(setLoading(false));
      // }, 1);
    });
  };
};
