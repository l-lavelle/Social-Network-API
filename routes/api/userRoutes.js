const router = require("express").Router();
const { User } = require("../../models");

// GET all users
router.get("/", async (req, res) => {
  try {
    const result = await User.find();
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
      .populate("thoughts")
      .populate("friends");

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

// PUT to update a user by its _id
router.put("/:userId", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "No user with this id!" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE to remove user by its _id
router.delete("/:userId", async (req, res) => {
  try {
    const deleteUser = await User.findOneAndRemove(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    );
    if (!deleteUser) {
      return res.status(404).json({ message: "No user with this id!" });
    }
    res.status(200).json({ message: "User has been deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST to add a new friend to a user's friend list
router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const friend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true }
    );
    if (!friend) {
      return res.status(404).json({ message: "No user with that id" });
    }
    res.status(200).json(friend);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to create new post" });
  }
});

// Update to remove a friend from a user's friend list
router.put("/:userId/friends/:friendId", async (req, res) => {
  try {
    const friend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!friend) {
      return res.status(404).json({ message: "No user with that id" });
    }
    res.status(200).json({ message: "Friend has been deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to create new post" });
  }
});

module.exports = router;
