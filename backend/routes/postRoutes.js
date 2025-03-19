const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.get("/", async (req, res) => {
  const { community } = req.query;
  const posts = await Post.find({ communityId: community }).populate(
    "createdBy"
  );
  res.json(posts);
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
