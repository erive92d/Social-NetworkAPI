const User = require("../models/User");

module.exports = {
  getUsers(req, res) {
    User.find()
      .populate('thoughts')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));

  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.update({ _id: req.params.userId }, { $set: { ...req.body } })
      .then((updateUser) => res.json(updateUser))
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.delete({ _id: req.params.userId })
      .then((deleteUser) => res.json(deleteUser))
      .catch((err) => res.status(500).json(err));
  },
};
