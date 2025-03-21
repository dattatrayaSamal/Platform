const express = require("express");
const Community = require("../models/Community");

const router = express.Router();

router.get("/", async (req, res) => {
  const communities = await Community.find();
  res.json(communities);
});

router.post("/:id/join", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const community = await Community.findById(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    if (!Array.isArray(community.members)) {
      community.members = [];
    }

    if (!community.members.includes(userId)) {
      community.members.push(userId);
      await community.save();
    }

    res.status(200).json({ message: "Joined successfully" });
  } catch (error) {
    console.error("Error joining community:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get a specific community by ID
router.get("/:id", async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    // ✅ Ensure `members` is always an array
    const formattedCommunity = {
      ...community.toObject(),
      members: Array.isArray(community.members) ? community.members : [],
    };

    res.json(formattedCommunity);
  } catch (err) {
    console.error("Error fetching community:", err);
    res.status(500).json({ error: "Failed to fetch community" });
  }
});

router.post("/", async (req, res) => {
  const { name, description, members } = req.body;

  try {
    const community = await Community.create({ name, description, members });
    res.status(201).json(community);
  } catch (err) {
    res.status(400).json({ error: "Community creation failed" });
  }
});

module.exports = router;
