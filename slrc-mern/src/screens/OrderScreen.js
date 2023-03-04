import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  payOrder,
  receivedOrder,
  updateStatusOrder,
} from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderDetailsScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [id, setId] = useState();

  const [sdkReady, setSdkReady] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (id !== orderId) {
      setId(orderId);
      dispatch(getOrderDetails(orderId));
    } else if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
    // if (order) {
    //   dispatch(getOrderDetails(orderId));
    // }
  }, [dispatch, orderId, order, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const orderStatusHandler = () => {
    dispatch(updateStatusOrder(orderId, { orderStatus }));
    history.push("/dashboard/orders");
    dispatch(getOrderDetails(orderId));
  };

  const orderReceivedHandler = () => {
    setOrderStatus("Order Received");
    dispatch(receivedOrder(orderId, {}));
    dispatch(getOrderDetails(orderId));
    history.push("/profile/myorders");
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2>Order: {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping Address</h2>
              <p>
                <strong>Name: {order.user.name}</strong>
                <br />
                <strong>
                  Email:{" "}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>{" "}
                </strong>
                <br />
                <strong>Address:</strong> {order.shippingAddress.address}
                <br />
                <strong>City: </strong>
                {order.shippingAddress.city}
                <br />
                <strong>State: </strong>
                {order.shippingAddress.state}
                <br />
                <strong>Postal Code: </strong>
                {order.shippingAddress.postalCode}
                <br />
                <strong>Country: </strong>
                {order.shippingAddress.country}
                <br />
                <strong>Tel: </strong>
                {order.shippingAddress.telNumber}
              </p>
              {order.isDelivered ? (
                <Message variant="success">{order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Item</h2>
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
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
                    <strong>${order.orderTotalPrice}/=</strong>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <strong>Shipping Cost</strong>
                  </Col>
                  <Col md={4}>
                    <strong>${order.shippingCost}/=</strong>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <strong>Tax</strong>
                  </Col>
                  <Col md={4}>
                    <strong>${order.taxPrice}/=</strong>
                  </Col>
                  <Col md={8}>
                    <h5>Total</h5>
                  </Col>
                  <Col md={4}>
                    <strong>${order.totalPrice}/=</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={8}>
                    <strong>Payment Method</strong>
                  </Col>
                  <Col>
                    <strong>{order.paymentMethod}</strong>
                  </Col>
                </Row>
                {order.isPaid ? (
                  <Message variant="success">{order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not paid</Message>
                )}
                {order.paymentMethod === "BankTransfer" ? (
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
              {loadingPay && <Loader />}
              {!sdkReady && !order.isPaid ? (
                <Loader />
              ) : !order.isPaid ? (
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={successPaymentHandler}
                />
              ) : (
                <></>
              )}
              {userInfo.isAdmin && (
                <ListGroup.Item>
                  <Form.Control
                    as="select"
                    onChange={(e) =>
                      e.target.value === null
                        ? setOrderStatus(order.orderStatus)
                        : setOrderStatus(e.target.value)
                    }
                  >
                    <option>{order.orderStatus}</option>
                    <option value={"Processing"}>Processing</option>
                    <option value={"Shipped"}>Shipped</option>
                    <option value={"Delivered"}>Delivered</option>
                  </Form.Control>
                  <Button className="btn-sm" onClick={orderStatusHandler}>
                    Update
                  </Button>
                </ListGroup.Item>
              )}
              {order.orderStatus === "Order Received" ? (
                <Button disabled>{order.orderStatus}</Button>
              ) :  (
                <Button onClick={orderReceivedHandler}>Order Received</Button>
              ) }
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetailsScreen;
