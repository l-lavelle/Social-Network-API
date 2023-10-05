// make sure everyhting is running though routes correctly

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

// Post a new thought
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

// PUT to update a thought by its _id
router.put("/:userId", async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }
    res.status(200).json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE to remove a thought by its _id
router.delete("/:userId", async (req, res) => {
  try {
    const thought = await Thought.findOneAndRemove(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }
    res.status(200).json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST to create a reaction stored in a single thought's reactions array field
router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    );
    res.status(200).json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.put("/:thoughtId/reactions/:reactionId", async (req, res) => {
  try {
    const thought = await Thought.updateOne(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: "No reaction with that id" });
    }
    res.status(200).json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
