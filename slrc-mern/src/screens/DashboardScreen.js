import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderList } from "../actions/orderActions";
import { Col, ListGroup, Row } from "react-bootstrap";
import UserList from "../components/UserList";
import { listUsers } from "../actions/userAction";
import OrderList from "../components/OrderList";

const DashboardScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const listOrders = useSelector((state) => state.orderList);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(orderList());
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Row>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item
              role="button"
              onClick={() => {
                history.push("/profile");
              }}
            >
              <h4>Admin Profile</h4>
            </ListGroup.Item>
            {userInfo && userInfo.isAdmin && (
              <ListGroup.Item
                role="button"
                onClick={() => {
                  history.push("/dashboard/orders");
                }}
              >
                <h4>Orders</h4>
              </ListGroup.Item>
            )}
            {userInfo && userInfo.isAdmin && (
              <ListGroup.Item
                role="button"
                onClick={() => {
                  history.push("/dashboard/users");
                }}
              >
                <h4>Users</h4>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
        <Col md={9}>
          {location.pathname === "/dashboard/users" && (
            <UserList userList={userList} />
          )}
          {location.pathname === "/dashboard/orders" && (
            <OrderList listOrders={listOrders} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default DashboardScreen;
