import {
  ADDRESS_CREATE_FAIL,
  ADDRESS_CREATE_REQUEST,
  ADDRESS_CREATE_SUCCESS,
} from "../constants/addressConstant";

export const addressCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDRESS_CREATE_REQUEST:
      return { loading: true };
    case ADDRESS_CREATE_SUCCESS:
      return { loading: false, success: true, address: action.payload };
    case ADDRESS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
