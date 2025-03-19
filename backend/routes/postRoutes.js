const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { community } = req.query;
    if (!community) {
      return res.status(400).json({ error: "Community ID is required" });
    }
    const posts = await Post.find({
      communityId: new ObjectId(community),
    }).populate("createdBy");
    res.json(posts);
  } catch (err) {
    console.log("Error fecthing posts:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  const { communityId, content, createdBy } = req.body;

  try {
    const post = await Post.create({ communityId, content, createdBy });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: "Post creation failed" });
  }
});

module.exports = router;
