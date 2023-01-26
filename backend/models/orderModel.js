import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, require: true },
        qty: { type: Number, require: true },
        image: { type: String, require: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: "Product",
        },
      },
    ],

    shippingAddress: {
      address: { type: String, require: true },
      city: { type: String, require: true },
      state: { type: String, require: true },
      postalCode: { type: Number, require: true },
      country: { type: String, require: true },
      telNumber: { type: Number, require: true },
    },

    paymentMethod: { type: String, require: true },
    paymentResult: {
      id: { type: String, require: true },
      status: { type: String, require: true },
      update_time: { type: String, require: true },
      email_address: { type: String, require: true },
    },
    cartTotalPrice: { type: Number, require: true, default: 0.0 },
    taxPrice: { type: Number, require: true, default: 0.0 },
    shippingCost: { type: Number, require: true, default: 0.0 },
    totalPrice: { type: Number, require: true, default: 0.0 },
    isPaid: { type: Boolean, require: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, require: true, default: false },
    deliveredAt: { type: Date },
  },
  { timestamp: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
