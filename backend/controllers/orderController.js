import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

//@desc Create new Order
//@rout POST /api/orders
//@access Private

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    cartTotalPrice,
    shippingCost,
    totalPrice,
    createdAt = Date.now(),
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      orderTotalPrice: cartTotalPrice,
      shippingCost,
      totalPrice,
      createdAt,
    });

    const createdOrder = await order.save();

    res.status(200).json(createdOrder);
  }
});

//@desc Get order by ID
//@rout GET /api/orders/:id
//@access Private

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not fond");
  }
});

//@desc Update order to paid
//@rout GET /api/orders/:id/pay
//@access Private

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.orderStatus = "Paid";
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not fond");
  }
});

//@desc Update order Status
//@rout GET /api/orders/:id
//@access Private

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.orderStatus = req.body.orderStatus;

    const updatedOrder = await order.save();

    res.json({
      _id: updatedOrder._id,
      orderStatus: updatedOrder.orderStatus,
    });
  } else {
    res.status(404);
    throw new Error("Order not fond");
  }
});

//@desc user order received
//@rout GET /api/orders/:id
//@access Private

export const userReceivedOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.orderStatus = "Order Received";
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not fond");
  }
});

//@desc Get logged in user orders
//@rout GET /api/profile/myorders
//@access Private

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

//@desc Get  orders
//@rout GET /api/orders
//@access Private

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});

  res.json(orders);
});
