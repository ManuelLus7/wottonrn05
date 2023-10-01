import { products } from '../../data/ProductsData';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';

export const loadProducts = () => {
  console.log('Productos cargados:', products);

  return {
    type: LOAD_PRODUCTS,
    payload: products,
  };
};

// ...

export const addToCart = (product) => {
  return (dispatch, getState) => {
    const { cart } = getState().products;
    console.log('Estado del carrito antes de agregar:', cart);

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si el producto ya está en el carrito, incremento la cantidad
      dispatch(incrementQuantity(product.id));
    } else {
      // Si el producto no está en el carrito, lo agrego con cantidad 1
      dispatch({
        type: ADD_TO_CART,
        payload: { ...product, quantity: 1 },
      });
    }
  };
};

export const incrementQuantity = (productId) => {
  return {
    type: INCREMENT_QUANTITY,
    payload: productId,
  };
};

export const decrementQuantity = (productId) => {
  return {
    type: DECREMENT_QUANTITY,
    payload: productId,
  };
};


export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};
