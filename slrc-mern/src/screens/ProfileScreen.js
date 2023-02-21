import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrderList } from "../actions/orderActions";
import { Col, ListGroup, Row } from "react-bootstrap";
import MyOrderList from "../components/MyOrderList";
import ProfileDetails from "../components/ProfileDetails";
import MyAddress from "../components/MyAddress";
import { myAddressList } from "../actions/addressAction";

const ProfileScreen = ({ location, history }) => {
  const [profile, setProfile] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const address = useSelector((state) => state.myAddresses);
  const { loading: addressLoading, error: addressError, addresses } = address;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: ordersLoading, error: ordersError, orders } = orderListMy;

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
            <ListGroup.Item role="button"
              onClick={() => {
                setProfile(true);
                history.push("/profile");
              }}
            >
              <h4>Profile</h4>
            </ListGroup.Item>
            {userInfo && userInfo.isAdmin && (
              <ListGroup.Item role="button"
                onClick={() => {
                  history.push("/dashboard/orders");
                }}
              >
                <h4>Dashboard</h4>
              </ListGroup.Item>
            )}
            <ListGroup.Item role="button"
              onClick={() => {
                setProfile(false);
                history.push("/profile/myorders");
              }}
            >
              <h4>Orders</h4>
            </ListGroup.Item>
            <ListGroup.Item role="button"
              onClick={() => {
                setProfile(false);
                history.push("/profile/myaddress");
              }}
            >
              <h4>Addresses</h4>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {(profile || location.pathname === "/profile") && <ProfileDetails />}
          {(location.pathname === "/profile/myorders") && (
            <MyOrderList
              orders={orders}
              loading={ordersLoading}
              error={ordersError}
            />
          )}
          {(location.pathname === "/profile/myaddress") && (
            <>
              <h2>My Addresses</h2>
              {addresses.map((address) => (
                <ListGroup key={address._id}>
                  <MyAddress
                    address={address}
                    loading={addressLoading}
                    error={addressError}
                  />
                </ListGroup>
              ))}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
