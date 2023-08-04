const initialState = {
  user: null,
  isLoggedIn: false, 
};

export const logoutUser = () => ({
  type: "LOGOUT_USER",
});

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default rootReducer;
