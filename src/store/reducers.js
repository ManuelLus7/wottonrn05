// Voy a manejar la autenticación desde aca
const initialState = {
  user: null,
  isLoggedIn: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      // Actualizo el estado para reflejar que el usuario está autenticado
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      // Actualizo el estado para reflejar que el usuario cerró sesión
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
