// need to populate get single id

// PUT to update a user by its _id
// DELETE to remove user by its _id
// BONUS: Remove a user's associated thoughts when deleted.

// /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list
const router = require("express").Router();
const { User, Thought } = require("../../models");

// GET all users
router.get("/", async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Unable to get all users" });
  }
});

// GET a single user by its _id and populated thought and friend data
router.get("/:userId", async (req, res) => {
  try {
    const singleUser = await User.findOne({
      _id: req.params.userId,
    })
      .select("-__v")
      .populate("thoughts");

    res.status(200).json(singleUser);
  } catch (err) {
    res.status(500).json({ error: "Unable to get user" });
  }
});

// POST a new user
router.post("/", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });
  newUser.save();
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    res.status(500).json({ error: "New user not created" });
  }
});

module.exports = router;
