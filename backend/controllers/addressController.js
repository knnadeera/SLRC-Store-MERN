import Address from "../models/addressModel.js";
import asyncHandler from "express-async-handler";

//@desc Create new shipping address
//@rout POST /api/shippingaddress
//@access Private

export const addShippingAddress = asyncHandler(async (req, res) => {
  const {
    shippingAddress,
  } = req.body;

  if (shippingAddress && shippingAddress.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const address = new Address({
      user: req.user._id,
      shippingAddress,
    });

    const createdShippingAddress = await address.save();

    res.status(200).json(createdShippingAddress);
  }
});