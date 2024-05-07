// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  token:null
};

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
        return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
       token: action.payload.token
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token:null
      };
    default:
      return state;
  }
}
