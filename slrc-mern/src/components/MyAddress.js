import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getAddressById } from "../actions/addressAction";
import Loader from "./Loader";
import Message from "./Message";

const MyAddress = ({ address, loading, error,fromUserEditScreen }) => {
  const dispatch = useDispatch();

  const addressEditHandler = () => {};

  const addShippingAddressHandler = () => {
    dispatch(getAddressById(address._id));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ListGroup onClick={addShippingAddressHandler}>
          <>
            <Row>
              <Col md={10}>
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
              </Col>
              {!fromUserEditScreen && <Col md={2}>
                <p onClick={addressEditHandler} type="button">
                  <i className="fa-sharp fa-solid fa-pen"></i> Edit
                </p>
              </Col>}
            </Row>
          </>
        </ListGroup>
      )}
    </>
  );
};

export default MyAddress;
