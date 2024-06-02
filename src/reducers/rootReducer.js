 import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
<<<<<<< HEAD
// import { searchReducer } from "./searchReducer";
// import { cartReducer } from "./cartReducer";
// import { drawerReducer } from "./drawerReducer";
// import { couponReducer } from "./couponReducer";
// import { CODReducer } from "./CODReducer";

const rootReducer = combineReducers({
  user: userReducer,
//   search: searchReducer,
//   cart: cartReducer,
//   drawer: drawerReducer,
//   coupon: couponReducer,
//   COD: CODReducer,
=======


const rootReducer = combineReducers({
  user: userReducer,

>>>>>>> cdfe2add478870de480dc1b904a86a39b0406f20
});

export default rootReducer;
