import mongoose from "mongoose";

const shippingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },

    shippingAddress: {
      address: { type: String, require: true },
      city: { type: String, require: true },
      state: { type: String, require: true },
      postalCode: { type: Number, require: true },
      country: { type: String, require: true },
      telNumber: { type: Number, require: true },
    },
},
  { timestamp: true }
);

const Address = mongoose.model("Address", shippingSchema);

export default Address;