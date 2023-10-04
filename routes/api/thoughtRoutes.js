// /api/thoughts

// PUT to update a thought by its _id
// DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array field
// DELETE to pull and remove a reaction by the reaction's reactionId value
const router = require("express").Router();
const { Thought, User } = require("../../models");

// Get all thoughts
router.get("/", async (req, res) => {
  try {
    const result = await Thought.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Unable to get all thoughts" });
  }
});

// GET a single thought by its _id
router.get("/:thoughtId", async (req, res) => {
  try {
    const result = await Thought.findOne({ _id: req.params.thoughtId });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Unable to get this thought" });
  }
});

//  (don't forget to push the created thought's _id to the associated user's thoughts array field)
//make sure user already exists
router.post("/", async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: newThought._id } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "No user with that id" });
    }
    newThought.save();
    res.status(200).json(newThought);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to create new post" });
  }
});
module.exports = router;
