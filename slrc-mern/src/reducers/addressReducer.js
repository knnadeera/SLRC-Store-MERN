import {
  ADDRESS_BY_ID_FAIL,
  ADDRESS_BY_ID_REQUEST,
  ADDRESS_BY_ID_SUCCESS,
  ADDRESS_CREATE_FAIL,
  ADDRESS_CREATE_REQUEST,
  ADDRESS_CREATE_SUCCESS,
  ADDRESS_LIST_MY_FAIL,
  ADDRESS_LIST_MY_REQUEST,
  ADDRESS_LIST_MY_RESET,
  ADDRESS_LIST_MY_SUCCESS,
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

export const addressListMyReducer = (state = { addresses: [] }, action) => {
  switch (action.type) {
    case ADDRESS_LIST_MY_REQUEST:
      return { loading: true ,addresses:[]};
    case ADDRESS_LIST_MY_SUCCESS:
      return { loading: false, addresses: action.payload };
    case ADDRESS_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    case ADDRESS_LIST_MY_RESET:
      return { address: [] };
    default:
      return state;
  }
};

export const addressDetailsReducer = (
  state = { loading: true,  addressById: {} },
  action
) => {
  switch (action.type) {
    case ADDRESS_BY_ID_REQUEST:
      return { ...state, loading: true };
    case ADDRESS_BY_ID_SUCCESS:
      return { loading: false, addressById: action.payload };
    case ADDRESS_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};