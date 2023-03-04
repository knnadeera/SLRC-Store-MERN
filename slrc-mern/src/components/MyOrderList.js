import React from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "./Loader";
import Message from "./Message";

const MyOrderList = ({ loading, error, orders }) => {
  return (
    <>
      <h2>Orders List</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>Date</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>Order Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((orders) => (
              <tr key={orders._id}>
                <td>{orders._id}</td>
                <td>{orders.createdAt.substring(0, 10)}</td>
                <td>{orders.totalPrice}</td>
                <td>
                  {orders.isPaid ? (
                    orders.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {orders.orderStatus === "Delivered" ||
                  orders.orderStatus === "Order Received"
                    ? <>
                    {orders.orderStatus} {orders.deliveredAt.substring(0, 10)}
                  </>
                    : orders.orderStatus}
                </td>
                <td>
                  <LinkContainer to={`/orders/${orders._id}`}>
                    <Button className="btn-sm" variant="light">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default MyOrderList;
