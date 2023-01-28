import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrderList } from "../actions/orderActions";
import { Col, ListGroup, Row } from "react-bootstrap";
import MyOrderList from "../components/MyOrderList";
import ProfileDetails from "../components/ProfileDetails";

const ProfileScreen = ({location,history}) => {
  const [profile, setProfile] = useState(true);
  const [myOrders, setMyOrders] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(myOrderList());
    }
  }, [dispatch, history, userInfo]);
  console.log(location.pathname);
  

  return (
    <>
      <Row>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item
              onClick={() => {
                setProfile(true);
                setMyOrders(false);
                history.push('/profile')
              }}
            >
              <h4>Profile</h4>
            </ListGroup.Item>
            <ListGroup.Item
              onClick={() => {
                setProfile(false);
                setMyOrders(true);
                history.push('/profile/myorders')
              }}
            >
              <h4>My Orders</h4>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {profile && <ProfileDetails />}
          {myOrders && <MyOrderList loading={loading} error={error} orders={orders}/>}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
