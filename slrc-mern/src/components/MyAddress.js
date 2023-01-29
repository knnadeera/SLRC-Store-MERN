import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";

const MyAddress = () => {

  const address = useSelector((state) => state.myAddresses);
  const { loading, error, addresses } = address;

  const addressEditHandler = () => {};
  return (
    <>
      <h2>Address List</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ListGroup>
          <>
            {addresses.map((address) => (
    
                <Row key={address._id}>
                  <Col md={10} >
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
                    </p></Col><Col md={2}>
                    <p onClick={addressEditHandler} type="button">
                      <i className="fa-sharp fa-solid fa-pen"></i> Edit
                    </p>
                  </Col>
                </Row>
              
            ))}
          </>
        </ListGroup>
      )}
    </>
  );
};

export default MyAddress;
