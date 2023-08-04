const uid = require("uuid");
const repo = require("../repository/repo");
const { User, delboy, menu, orders, sequence } = require("../model/db");

//Delivery Boy
const createDelBoy = async function (name, age, gender) {
  try {
    let existUser = await repo.findDelBoybyName(name);
    if (!existUser[0]) {
      const Delboy = new delboy({
        id: uid.v4(),
        name: name,
        age: age,
        gender: gender,
      });
      await delboy.create(Delboy);
      return JSON.stringify({
        message:
          "Congrats!! you are Successfully registered as our delivery agent",
      });
    } else {
      return JSON.stringify({
        message: "delivery agent details already exists",
      });
    }
  } catch (err) {
    return "Data Not Found";
  }
};

const setDelAvlStatus = async function (id, Status) {
  let existingPartner = await repo.findDelboyById(id);
  try {
    if (existingPartner) {
      await repo.updateDelStatus(id, Status);
      return JSON.stringify({
        message: "Availability Status updated successfully",
      });
    } else {
      return JSON.stringify({ message: "profile doesn't match our records" });
    }
  } catch (error) {
    return "Data not found";
  }
};

const deleteDelBoy = async function (id) {
  let existingPartner = await repo.findDelboyById(id);
  try {
    if (existingPartner) {
      await repo.deleteDeliveryBoy(id);
      return JSON.stringify({
        message: "Delivery profile deleted successfully",
      });
    } else {
      return JSON.stringify({ message: "profile doesn't match our records" });
    }
  } catch (error) {
    return "Data not found";
  }
};

//restaurant
const createMenu = async function (uitemName, ucategory, uprice) {
  try {
    const Menu = new menu({
      itemId: uid.v4(),
      itemName: uitemName,
      category: ucategory,
      price: uprice,
    });
    await menu.create(Menu);
    return JSON.stringify({ message: "Item added to menu successfully " });
  } catch (err) {
    return "Data not found";
  }
};

const deleteMenu = async function (itemId) {
  const existingItem = await repo.findMenuByItemId(itemId);
  try {
    if (existingItem[0]) {
      await repo.deleteMenuItem(itemId);
      return JSON.stringify({ message: "Item deleted successfully" });
    } else {
      return JSON.stringify({ message: "Item doesn't exists" });
    }
  } catch (error) {
    return "Data not found";
  }
};

//User
const createUser = async function (name, location) {
  try {
    const existingUser = await repo.findUserByName(name);
    if (!existingUser[0]) {
      const user = new User({
        id: uid.v4(),
        name: name,
        location: location,
      });
      await User.create(user);
      return JSON.stringify({ message: "User Created Successfully" });
    } else {
      return JSON.stringify({ message: "User already exists" });
    }
  } catch (err) {
    return "Data Not Found";
  }
};

const deleteUser = async function (id) {
  const existingUser = await repo.findUserById(id);
  try {
    if (existingUser) {
      await repo.deleteUserById(id);
      return JSON.stringify({
        message: "User profile deleted Successfully",
      });
    } else {
      return JSON.stringify({
        message: "User profile doesn't match our records",
      });
    }
  } catch (error) {
    return "Data not found";
  }
};

const getMenuItems = async function (page, limit) {
  let data = await repo.getAllMenu(page, limit);
  return data;
};

const getItemsByCategory = async function (category, page, limit) {
  let data = await repo.getMenuByCategory(category, page, limit);
  return data;
};

const getItemsByName = async function (item) {
  let data = await repo.getMenuBySingleword(item);
  return data;
};

const OrderDetails = async function (orderId) {
  let data = await repo.getOderDetails(orderId);
  if (data) {
    return data;
  } else {
    return "Incorrect orderId.Please provide a correct one";
  }
};

let count = 0;
const placeOrder = async function (id, itemId) {
  try {
    const existingUser = await repo.findUserById(id);
    if (!existingUser) {
      return "User data is not present in our records.Please do create an account to Place Order";
    } else {
      const arr = [];
      for (const item of itemId) {
        const existingItem = await repo.findMenuByItemId(item);
        if (existingItem[0]) {
          arr.push({
            itemID: existingItem[0].itemId,
            itemName: existingItem[0].itemName,
            category: existingItem[0].category,
            Price: existingItem[0].price,
          });
        } else {
          return "please provide exact itemId";
        }
      }
      const deliveryPartner = await repo.findDelBoyStatus();
      if (deliveryPartner) {
        const order = new orders({
          orderId: `OD${new Date().getTime()}${++count}`,
          user: {
            userId: id,
            userName: existingUser.name,
            cart: arr,
          },
          deliveryDetails: {
            deliveryPersonId: deliveryPartner.id,
            deliveryPersonName: deliveryPartner.name,
            deliveryLocation: existingUser.location,
          },
          noOfItems: arr.length,
          totalAmount: arr.reduce((pre, obj) => {
            return pre + parseInt(obj.Price);
          }, 0),
          isDeleted: false,
        });
        await orders.create(order);
        await repo.updateSequenceDb();
        return JSON.stringify({ message: "Order Created Successfully" });
      } else {
        return JSON.stringify({
          message: "All delivery agents are currently Busy. Please try again",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser,
  createMenu,
  createDelBoy,
  deleteMenu,
  deleteDelBoy,
  placeOrder,
  getItemsByName,
  OrderDetails,
  setDelAvlStatus,
  deleteUser,
  getItemsByCategory,
  getMenuItems,
};
