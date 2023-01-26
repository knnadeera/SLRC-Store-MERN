import React, { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod, cartTotalPrice } = cart;

  const user = useSelector((state) => state.userLogin.userInfo);

  const { address, city, state, postalCode, country, telNumber } =
    shippingAddress;

  const addDecimals = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
  };

  const shippingCost = addDecimals(+cartTotalPrice > 100 ? 0 : 10);

  const taxPrice = addDecimals((+cartTotalPrice + +shippingCost) * 0.15);

  const totalPrice = (+cartTotalPrice + +shippingCost + +taxPrice).toFixed(2);

  if (!user) {
    history.push("/cart");
  } else if (!address) {
    history.push("/shipping");
  } else if (!paymentMethod) {
    history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        cartTotalPrice: cartTotalPrice,
        shippingCost,
        taxPrice,
        totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Item</h2>
              <ListGroup variant="flush">
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={6}>{item.name}</Col>
                      <Col md={2}>
                        {item.qty} x ${item.price}
                      </Col>
                      <Col md={1}>=</Col>
                      <Col md={1}>${item.qty * item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h1>Order Summary</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={8}>
                    <strong>Items Price</strong>
                  </Col>
                  <Col md={4}>
                    <strong>${cartTotalPrice}/=</strong>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <strong>Shipping Cost</strong>
                  </Col>
                  <Col md={4}>
                    <strong>${shippingCost}/=</strong>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <strong>Tax</strong>
                  </Col>
                  <Col md={4}>
                    <strong>${taxPrice}/=</strong>
                  </Col>
                  <Col md={8}>
                    <h5>Total</h5>
                  </Col>
                  <Col md={4}>
                    <strong>${totalPrice}/=</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Payment Method</strong>
                  </Col>
                  <Col>
                    <strong>{paymentMethod}</strong>
                  </Col>
                </Row>
                {paymentMethod === "BankTransfer" ? (
                  <Row>
                    <Col md={12}>
                      <h6 className="mt-4">Bank Details:</h6>
                      <p>
                        <strong>
                          Hatton National Bank
                          <br />
                          Weligama Branch
                          <br />
                          213020043319
                          <br />K N Nadeera
                        </strong>
                      </p>
                    </Col>
                  </Row>
                ) : (
                  <></>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Shipping Address</h2>
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
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
              <Button
                type="button"
                className="btn-black"
                disabled={cartItems === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
