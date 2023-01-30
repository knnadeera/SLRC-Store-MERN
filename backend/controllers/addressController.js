import Address from "../models/addressModel.js";
import asyncHandler from "express-async-handler";

//@desc Create new shipping address
//@rout POST /api/shippingaddress
//@access Private

export const addShippingAddress = asyncHandler(async (req, res) => {
  const { shippingAddress } = req.body;

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

//@desc Get logged in user orders
//@rout GET /api/address/myaddress
//@access Private

export const getMyAddress = asyncHandler(async (req, res) => {
  const address = await Address.find({ user: req.user._id });

  res.json(address);
});

// @desc Update User profile
//@rout PUT/api/address/edit
//@access Private

export const updateUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  const address = await Address.findOne({ _id });

  if (address) {
    address.shippingAddress.address =
      req.body.address || address.shippingAddress.address;

    const updatedAddress = await address.save();

    res.json({
      name: updatedAddress.address,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Get address by ID
//@rout GET /api/address/:id
//@access Private

export const getAddressById = asyncHandler(async (req, res) => {
  const address = await Address.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (address) {
    res.json(address);
  } else {
    res.status(404);
    throw new Error("Order not fond");
  }
});