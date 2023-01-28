import React, { useState } from "react";
import { Button, Col, Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  if (!userInfo) {
    history.push("/cart");
  }

  const [edit, setEdit] = useState(false);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [telNumber, setTelNumber] = useState(shippingAddress.telNumber);

  const dispatch = useDispatch();

  const addressEditHandler = () => {
    setEdit(true);
  };

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

  return (
    <>
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h1>Shipping</h1>
        {!edit && (
          <ListGroup>
            <Col>
              <p>
                <br />
                {address}
                <br />
                {city}
                <br />
                {state}
                <br />
                {postalCode}
                <br />
                {country}
                <br />
                {telNumber}
              </p>
              <p
                style={{ color: "red" }}
                onClick={addressEditHandler}
                type="button"
              >
                <i className="fa-sharp fa-solid fa-pen"></i> Edit
              </p>
            </Col>
          </ListGroup>
        )}
        {edit && (
          <Form>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="state">
              <Form.Label>State/Province</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter state/province"
                value={state}
                required
                onChange={(e) => setState(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postalCode"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="telNumber">
              <Form.Label>Tel Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter TelNumber"
                value={telNumber}
                required
                onChange={(e) => setTelNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        )}
        <Button
          type="button"
          variant="primary"
          onClick={submitHandler}
          className="mt-2"
        >
          Continue
        </Button>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
