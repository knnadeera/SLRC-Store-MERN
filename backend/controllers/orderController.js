import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

// @desc Create new Order
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
      cartTotalPrice,
      shippingCost,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(200).json(createdOrder);
  }
});
