import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from "./reducers/orderReducers";
import {
  addressDetailsReducer,
  addressListMyReducer,
} from "./reducers/addressReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderList: orderListReducer,
  orderListMy: orderListMyReducer,
  myAddresses: addressListMyReducer,
  addressById: addressDetailsReducer,
});

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "";

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const totalPriceFromLocalStorage = localStorage.getItem("totalPrice")
  ? JSON.parse(localStorage.getItem("totalPrice"))
  : "";

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
    paymentMethod: paymentMethodFromLocalStorage,
    cartTotalPrice: totalPriceFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
