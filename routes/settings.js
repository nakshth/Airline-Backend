const express = require("express");
const settingsRouter = express.Router();
const fs = require("fs");
const admin = require("firebase-admin");
var db = admin.database();
var userRef = db.ref("settings");

settingsRouter.get("/get", (req, res) => {
  getSettingsData()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

settingsRouter.put("/update", (req, res) => {
  const bodyData = req.body;
  userRef.update(bodyData).then(() => {
    res.status(200).json({
      success: true,
      message: "successfully updated"
    });
  })
  .catch((error) => {
    res.status(400).send(error);
  });
});


const getSettingsData = function () {
  return new Promise((resolve, reject) => {
    try {
      userRef.once("value", function (snap) {
        let data = {};
        data = snap.val();
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { settingsRouter, getSettingsData };
