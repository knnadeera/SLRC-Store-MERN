import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const PaymentScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [bankTransfer, setBankTransfer] = useState(false);

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  const totalPrice = localStorage.getItem("total");

  if (!userInfo) {
    history.push("/cart");
  }

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-4">
            <Form.Label as="legend">Select Payment Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="Bank Transfer"
                name="paymentMethod"
                value="BankTransfer"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          {paymentMethod === "BankTransfer" ? (
            <Form.Group>
              <Form.Label as="legend">Bank Transfer Details</Form.Label>
              <p>
                Hatton National Bank
                <br />
                Weligama Branch
                <br />
                213020043319
                <br />K N Nadeera
              </p>
            </Form.Group>
          ) : (
            <></>
          )}
          <h5>Total Price : ${totalPrice}/=</h5>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
