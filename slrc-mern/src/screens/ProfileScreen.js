import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrderList } from "../actions/orderActions";
import { Col, ListGroup, Row } from "react-bootstrap";
import MyOrderList from "../components/MyOrderList";
import ProfileDetails from "../components/ProfileDetails";
import MyAddress from "../components/MyAddress";
import { myAddressList } from "../actions/addressAction";

const ProfileScreen = ({ location, history }) => {
  const [profile, setProfile] = useState(true);
  const [myOrders, setMyOrders] = useState(false);
  const [myAddress, setMyAddress] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const {
    loading: orderListLoading,
    error: orderListErr,
    orders,
  } = orderListMy;

  const address = useSelector((state) => state.myAddresses);
  const { loading, error, addresses } = address;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(myOrderList());
      dispatch(myAddressList());
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Row>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item
              onClick={() => {
                setProfile(true);
                setMyOrders(false);
                setMyAddress(false);
                history.push("/profile");
              }}
            >
              <h4>Profile</h4>
            </ListGroup.Item>
            <ListGroup.Item
              onClick={() => {
                setProfile(false);
                setMyOrders(true);
                setMyAddress(false);
                history.push("/profile/myorders");
              }}
            >
              <h4>Orders</h4>
            </ListGroup.Item>
            <ListGroup.Item
              onClick={() => {
                setProfile(false);
                setMyOrders(false);
                setMyAddress(true);
                history.push("/profile/myaddress");
              }}
            >
              <h4>Addresses</h4>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {profile && <ProfileDetails />}
          {myOrders && (
            <MyOrderList
              loading={orderListLoading}
              error={orderListErr}
              orders={orders}
            />
          )}
          {myAddress && (
            <MyAddress loading={loading} error={error} address={addresses} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
