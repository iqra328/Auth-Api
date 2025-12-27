const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
module.exports = app;