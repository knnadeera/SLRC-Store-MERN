import React from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "./Loader";
import Message from "./Message";

const MyOrderList = ({ orders, error, loading }) => {
  return (
    <>
      <h2>My Orders</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
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
                  {orders.isDelivered ? (
                    orders.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/orders/${orders._id}`}>
                    <Button className="btn-sm" variant="light">Details</Button>
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
