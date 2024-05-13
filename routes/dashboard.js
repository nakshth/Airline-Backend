const express = require("express");
const dashboardRouter = express.Router();

dashboardRouter.get("/card", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send('');
}).catch((err) => {
    res.status(400).send(err);
});

module.exports = { dashboardRouter };
