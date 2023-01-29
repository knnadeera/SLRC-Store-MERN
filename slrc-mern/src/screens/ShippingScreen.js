import React, { useState } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createAddress } from "../actions/addressAction";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import MyAddress from "../components/MyAddress";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  const myAddress = useSelector((state) => state.myAddresses);
  const { addresses } = myAddress;

  if (!userInfo || !addresses) {
    history.push("/cart");
  }

  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [telNumber, setTelNumber] = useState(shippingAddress.telNumber);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        state,
        postalCode,
        country,
        telNumber,
      })
    );

    history.push("/payment");
  };

  const newAddressSaveHandler = () => {
    dispatch(
      createAddress({
        shippingAddress: {
          address,
          city,
          state,
          postalCode,
          country,
          telNumber,
        },
      })
    );
    setNewAddress(false);
  };

  const addNewAddressHandler = () => {
    setNewAddress(true);
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h1>Shipping</h1>
        {!newAddress && (
          <>
            <Col className="mb-3">
              <strong onClick={addNewAddressHandler} type="button">
                Add new address
              </strong>
            </Col>
            <ListGroup>
              <Row>
                <Col>
                  <MyAddress />
                </Col>
              </Row>
            </ListGroup>
          </>
        )}
        {newAddress && (
          <Form>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="state">
              <Form.Label>State/Province</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter state/province"
                required
                onChange={(e) => setState(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postalCode"
                required
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                required
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="telNumber">
              <Form.Label>Tel Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter TelNumber"
                required
                onChange={(e) => setTelNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        )}
        {newAddress ? (
          <Row>
            <Button
              type="button"
              variant="primary"
              onClick={newAddressSaveHandler}
              className="mt-3 "
            >
              Save
            </Button>
            <Button
              type="button"
              variant="light"
              className="mt-3"
              onClick={() => {
                setNewAddress(false);
              }}
            >
              Cancel
            </Button>
          </Row>
        ) : (
          <Button
            type="button"
            variant="primary"
            onClick={submitHandler}
            className="mt-3"
          >
            Continue
          </Button>
        )}
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
