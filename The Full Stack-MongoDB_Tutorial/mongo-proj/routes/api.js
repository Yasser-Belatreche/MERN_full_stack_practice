// Full Documentation - https://docs.turbo360.co
const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

/*  This is a sample API route. */

router.get("/profile", async (req, res) => {
  await Profile.find()
    .then((profiles) => {
      res.json({
        confirm: "success",
        data: profiles,
      });
    })
    .catch((err) => {
      res.json({
        cofirmation: "fail",
        message: err.message,
      });
    });
});

module.exports = router;
