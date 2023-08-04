const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const deliveryBoyRoutes = require("./routes/DeliveryPerson");
const RestaurantRoutes = require("./routes/Restaurant");
const authenticRoutes = require("./routes/auth");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRoutes);
app.use(deliveryBoyRoutes);
app.use(RestaurantRoutes);
app.use(authenticRoutes);

app.listen((port = 3000), () => {
  console.log(`Server is listening on port ${port}`);
});
