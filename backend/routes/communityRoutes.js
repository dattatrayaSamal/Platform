const express = require("express");
const Community = require("../models/Community");

const router = express.Router();

router.get("/", async (req, res) => {
  const communities = await Community.find();
  res.json(communities);
});

router.post("/", async (req, res) => {
  const { name, description, createdBy } = req.body;

  try {
    const community = await Community.create({ name, description, createdBy });
    res.status(201).json(community);
  } catch (err) {
    res.status(400).json({ error: "Community creation failed" });
  }
});

module.exports = router;
