import React, { useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import ProfileDetails from "../components/ProfileDetails";

const ProfileScreen = ({history}) => {
  const [profile, setProfile] = useState(true);
  const [myOrders, setMyOrders] = useState(false);

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
          {myOrders && <h1>miisd</h1>}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
