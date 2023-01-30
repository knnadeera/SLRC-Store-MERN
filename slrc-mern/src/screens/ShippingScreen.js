import React, { useEffect, useState } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createAddress, myAddressList } from "../actions/addressAction";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import MyAddress from "../components/MyAddress";

const ShippingScreen = ({ history, location }) => {
  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  const myAddress = useSelector((state) => state.myAddresses);
  const {
    loading: addressListLoading,
    error: addressListErr,
    addresses,
  } = myAddress;

  const addressId = useSelector((state) => state.addressById);
  const { addressById, loading } = addressId;

  if (!userInfo) {
    history.push("/cart");
  }

  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState();
  const [telNumber, setTelNumber] = useState();
  const [selected, setSelected] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myAddressList());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address: addressById.shippingAddress.address,
        city: addressById.shippingAddress.city,
        state: addressById.shippingAddress.state,
        postalCode: addressById.shippingAddress.postalCode,
        country: addressById.shippingAddress.country,
        telNumber: addressById.shippingAddress.telNumber,
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
                  {addresses.map((address, index) => (
                    <ListGroup
                      key={address._id}
                      style={{
                        backgroundColor:
                          selected === index ? "lightgray" : "white",
                      }}
                      onClick={() =>
                        setSelected(selected === index ? null : index)
                      }
                    >
                      <MyAddress
                        address={address}
                        loading={addressListLoading}
                        error={addressListErr}
                      />
                    </ListGroup>
                  ))}
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
              Save & Continue
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
            disabled={loading}
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
