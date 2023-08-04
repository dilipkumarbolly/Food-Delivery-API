const { User, delboy, menu, orders, sequence } = require("../model/db");

//CRUD on delivery Boy
const findDelBoybyName = async function (name) {
  const existUser = await delboy.find({ name: name });
  return existUser;
};

const findDelBoyStatus = async function () {
  const deliveryPartner = await delboy.findOne({ Status: "Available" });
  return deliveryPartner;
};

const findDelboyById = async function (id) {
  const existUser = await delboy.find({ id: id });
  return existUser;
};

const updateDelStatus = async function (id, Status) {
  await delboy.updateOne({ id: id }, { Status: Status });
};

const deleteDeliveryBoy = async function (id) {
  await delboy.deleteOne({ id: id });
};

//User
const findUserByName = async function (name) {
  const existUser = await User.find({ name: name });
  return existUser;
};

const findUserById = async function (id) {
  const existUser = await User.findOne({ id: id });
  return existUser;
};

//menuItems
const getAllMenu = async function (page, limit) {
  let skip = (page - 1) * limit;
  let data = await menu.find().skip(skip).limit(limit);
  return data;
};

const findMenuByItemId = async function (itemId) {
  console.log(itemId);
  const existMenu = await menu.find({itemId: itemId });
  console.log(existMenu);
  return existMenu;
};

const getMenuByCategory = async function (category, page, limit) {
  let skip = (page - 1) * limit;
  let data = await menu.find({ category }).skip(skip).limit(limit);
  return data;
};

const getMenuBySingleword = async function (item) {
  let data = await menu.find({ itemName: { $regex: item } }).limit(5);
  return data; 
};

const getOderDetails = async function (orderId) {
  let data = await orders.find({ orderId: orderId });
  return data;
};

const updateSequenceDb = async function () {
  return await sequence.updateOne({}, { $inc: { OrderCount: 1 } });
};

const deleteMenuItem = async function (itemId) {
  await menu.deleteOne({ itemId: itemId });
};

const deleteUserById = async function (id) {
  await User.deleteOne({ id: id });
};

module.exports = {
  findDelBoybyName,
  findDelboyById,
  findMenuByItemId,
  findUserByName,
  findUserById,
  getMenuByCategory,
  getMenuBySingleword,
  getOderDetails,
  getAllMenu,
  deleteMenuItem,
  findDelBoyStatus,
  updateSequenceDb,
  updateDelStatus,
  deleteDeliveryBoy,
  deleteUserById,
};
