import React, { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderDetailsScreen = ({ match }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  console.log("order", order);

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
              <ListGroup.Item>
                <h2>Shipping Address</h2>
                <p>
                  <strong>Name: {order.user.name}</strong>
                  <br />
                  <strong>
                    Email:{" "}
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>{" "}
                  </strong>
                  <br />
                  {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city}
                  <br />
                  {order.shippingAddress.state}
                  <br />
                  {order.shippingAddress.postalCode}
                  <br />
                  {order.shippingAddress.country}
                  <br />
                  {order.shippingAddress.telNumber}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">{order.deliveredAt}</Message>
                ) : (
                  <Message variant="danger">Not delivered</Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetailsScreen;
