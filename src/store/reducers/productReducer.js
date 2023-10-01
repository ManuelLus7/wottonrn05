import {
  ADD_TO_CART,
  LOAD_PRODUCTS,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  REMOVE_FROM_CART,
} from "../actions/productActions";

const initialState = {
  cart: [],
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case ADD_TO_CART:
      // Compruebo si el producto ya está en el carrito
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        // Si el producto existe en el carrito, actualizo su cantidad y subtotal
        const updatedCart = [...state.cart];
        const existingProduct = updatedCart[existingProductIndex];

        updatedCart[existingProductIndex] = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
          subtotal: existingProduct.subtotal + existingProduct.price,
        };

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // Si el producto no existe en el carrito, lo agrego
        return {
          ...state,
          cart: [
            ...state.cart,
            { ...action.payload, quantity: 1, subtotal: action.payload.price },
          ],
        };
      }
    case INCREMENT_QUANTITY:
      // Incremento la cantidad y el subtotal del producto en el carrito
      const updatedCartIncrement = state.cart.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.subtotal + item.price,
            }
          : item
      );

      return {
        ...state,
        cart: updatedCartIncrement,
      };

    case DECREMENT_QUANTITY:
      // Disminuyo la cantidad y el subtotal del producto en el carrito
      const updatedCartDecrement = state.cart.map((item) =>
        item.id === action.payload && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              subtotal: item.subtotal - item.price,
            }
          : item
      );

      return {
        ...state,
        cart: updatedCartDecrement,
      };

    case REMOVE_FROM_CART:
      // Elimino el producto del carrito
      const updatedCartAfterRemove = state.cart.filter(
        (item) => item.id !== action.payload
      );
      console.log("Carrito después de eliminar:", updatedCartAfterRemove); // Agrega este log
      return {
        ...state,
        cart: updatedCartAfterRemove,
      };

    default:
      return state;
  }
};

export default productReducer;
