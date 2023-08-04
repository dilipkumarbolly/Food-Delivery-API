const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
let service = require("../service/service");
const repo = require("../repository/repo");

const createToken = async (req, res) => {
  const { name } = req.body;
  const user = {
    name: name,
  };
  const existUser = await repo.findUserByName(name);
  if (existUser[0]) {
    jwt.sign(
      { user },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" },
      async (err, token) => {
        if (err) {
          console.log(err);
        } else {
          return res.status(200).send({ accToken: token });
        }
      }
    );
  } else {
    return res.status(404).send({ error: "User doesnt exist in our records" });
  }
};

//user
const controlUser = async (req, res) => {
  const { name, location } = req.body;
  if (!(name && location)) {
    return res.send({ error: "please provide correct userDetails" });
  }
  let data = await service.createUser(name, location);
  return res.status(200).send(data);
};

const controlDeleteUser = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.send({ error: "please provide correct userId" });
  }
  let data = await service.deleteUser(id);
  return res.send(data);
};

const placeOrderById = async (req, res) => {
  const userId = req.body.userId;
  const itemId = req.body.itemId;
  if (!(userId && itemId)) {
    return res.send({ error: "please provide correct userId & itemId" });
  }
  let data = await service.placeOrder(userId, itemId);
  res.send(data);
};

const trackOrderId = async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) {
    return res.send({ error: "please provide correct orderId" });
  }
  let data = await service.OrderDetails(orderId);
  return res.send(data);
};

const controlMenuItems = async (req, res) => {
  const { page, limit } = req.query;
  if (!(page && limit)) {
    return res.send({ error: "please provide page & limit" });
  }
  if(page<=0 || limit<=0){
    return res.send({error:"please provide page and limit greater than Zero"})
  }
  let data = await service.getMenuItems(page, limit);
  return res.send(data);
};

const controlItemsCategory = async (req, res) => {
  const { category, page, limit } = req.query;
  if (!(category && page && limit)) {
    return res.send({ error: "please provide category, page & limit" });
  }
  if(page<=0 || limit<=0){
    return res.send({error:"please provide page and limit greater than Zero"})
  }
  let data = await service.getItemsByCategory(category, page, limit);
  return res.send(data);
};

const controlItemByName = async (req, res) => {
  const { item } = req.params;
  if (!item) {
    return res.send({ error: "please provide itemName" });
  }
  let data = await service.getItemsByName(item);
  return res.send(data);
};

//delivery Boy
const controldelboy = async (req, res) => {
  const { name, age, gender } = req.body;
  if (!(name && age && gender)) {
    return res.send({ error: "please provide name, age, gender" });
  }
  let data = await service.createDelBoy(name, age, gender);
  return res.send(data);
};

const controlAvailability = async (req, res) => {
  const { id, Status } = req.body;
  if (!(id && Status)) {
    return res.send({ error: "please provide id,Status" });
  }
  let data = await service.setDelAvlStatus(id, Status);
  return res.send(data);
};

const controlDeleteDelBoy = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.send({ error: "please provide id" });
  }
  let data = await service.deleteDelBoy(id);
  return res.send(data);
};

//restaurant
const controlMenu = async (req, res) => {
  const { itemName, category, price } = req.body;
  if (!(itemName && category && price)) {
    return res.send({ error: "please provide correct itemDetails" });
  }
  let data = await service.createMenu(itemName, category, price);
  return res.send(data);
};

const controlDeleteMenu = async (req, res) => {
  const { itemId } = req.body;
  if (!itemId) {
    return res.send({ error: "please provide correct itemId" });
  }
  let data = await service.deleteMenu(itemId);
  return res.send(data);
};

module.exports = {
  controlUser,
  controldelboy,
  controlMenu,
  controlDeleteMenu,
  controlDeleteDelBoy,
  trackOrderId,
  controlAvailability,
  controlMenuItems,
  placeOrderById,
  controlDeleteUser,
  controlItemByName,
  createToken,
  controlItemsCategory,
};
