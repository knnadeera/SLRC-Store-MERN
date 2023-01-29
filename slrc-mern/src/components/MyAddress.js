import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";

const MyAddress = ({ loading, error, address }) => {
  return (
    <>
      <h2>My Orders</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ListGroup>
          <>
            {address.map((address) => (
              <ListGroup.Item key={address._id}>
                <Col md={6}>
                  <p>
                    <br />
                    {address.shippingAddress.address}
                    <br />
                    {address.shippingAddress.city}
                    <br />
                    {address.shippingAddress.state}
                    <br />
                    {address.shippingAddress.postalCode}
                    <br />
                    {address.shippingAddress.country}
                    <br />
                    {address.shippingAddress.telNumber}
                  </p>
                  {/* <p onClick={addressEditHandler} type="button">
              <i className="fa-sharp fa-solid fa-pen"></i> Edit
            </p> */}
                </Col>
              </ListGroup.Item>
            ))}
          </>
        </ListGroup>
      )}
    </>
  );
};

export default MyAddress;
