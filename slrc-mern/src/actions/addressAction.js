import axios from "axios";
import {
  ADDRESS_CREATE_FAIL,
  ADDRESS_CREATE_REQUEST,
  ADDRESS_CREATE_SUCCESS,
  ADDRESS_LIST_MY_FAIL,
  ADDRESS_LIST_MY_REQUEST,
  ADDRESS_LIST_MY_SUCCESS,
} from "../constants/addressConstant";

export const createAddress = (address) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADDRESS_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/address`, address, config);

    dispatch({
      type: ADDRESS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADDRESS_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const myAddressList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADDRESS_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/address/myaddress`, config);

    dispatch({
      type: ADDRESS_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADDRESS_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
