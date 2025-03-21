const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/Post");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { community } = req.query;
    if (!community) {
      return res.status(400).json({ error: "Community ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(community)) {
      return res.status(400).json({ error: "Invalid Community ID format" });
    }

    const posts = await Post.find({
      community: new mongoose.Types.ObjectId(community),
    }).populate("createdBy", "username email");
    res.json(posts);
  } catch (err) {
    console.log("Error fecthing posts:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  const { community, content, createdBy } = req.body;

  console.log("Incoming Data:", req.body);

  try {
    const post = await Post.create({ community, content, createdBy });
    console.log("Post Created:", post);
    res.status(201).json(post);
  } catch (err) {
    console.log(" Error Creating Post:", err);
    res.status(400).json({ error: "Post creation failed" });
  }
});

module.exports = router;
