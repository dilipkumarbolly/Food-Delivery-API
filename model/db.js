const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://0.0.0.0:27017/FoodDelivery")
  .then(() => {
    console.log("connected to MongoDB successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  location: String,
  isDeleted: { type: Boolean, default: false },
});

const deliveryBoySchema = new mongoose.Schema({
  id: String,
  name: String,
  age: Number,
  gender: String,
  Status: { type: String, default: "Available" },
  isDeleted: { type: Boolean, default: false },
});

const menudetailsSchema = new mongoose.Schema({
  itemId: String,
  itemName: String,
  category: String,
  price: String,
  isDeleted: { type: Boolean, default: false },
});

const orderdetailsSchema = new mongoose.Schema({
  orderId: String,
  user: {
    userId: String,
    userName: String,
    cart: [
      {
        itemID: String,
        itemName: String,
        category: String,
        Price: String,
      },
    ],
  },
  deliveryDetails: {
    deliveryPersonId: String,
    deliveryPersonName: String,
    deliveryLocation: String,
  },
  noOfItems: String,
  totalAmount: String,
  isDeleted: Boolean,
});

const SequencecollectionSchema = new mongoose.Schema({
  OrderCount: Number,
});

const User = mongoose.model("users", userSchema);
const delboy = mongoose.model("delboy", deliveryBoySchema);
const menu = mongoose.model("menu", menudetailsSchema);
const sequence = mongoose.model("sequence", SequencecollectionSchema);
const orders = mongoose.model("orders", orderdetailsSchema);

module.exports = {
  User,
  delboy,
  menu,
  sequence,
  orders,
};
