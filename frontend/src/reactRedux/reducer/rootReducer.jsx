import { combineReducers } from "redux";
import cartItemListReducer from "./cartItemListReducer";

const rootReducer = combineReducers({
  cartList: cartItemListReducer,
});

export default rootReducer;
