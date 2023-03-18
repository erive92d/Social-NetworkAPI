const { Thought, User } = require('../models');

module.exports = {
  getThought(req, res) {
    Thought.find()
      .then((Thought) => res.json(Thought))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new post
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Thought created, but found no user with that ID' })
          : res.json('Created the Thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req,res) {
    Thought.findByIdAndUpdate({_id:req.params.thoughtId},{$set:{
      ...req.body
    }})
    .then((resp)=> res.json(resp))
    .catch((err)=> console.log(err))
    
  },
  deleteThought(req,res) {
    Thought.findByIdAndDelete({_id: req.params.thoughtId})
    .then((resp)=>res.json(resp))
    .catch((err)=> console.log(err))
  }
,
  postReaction(req,res) {                      //POSTING REACTIONS
    Thought.findByIdAndUpdate({_id:req.params.thoughtId}, {$push:{reactions: req.body}})
    .then((resp) => res.json(resp))
    .catch((err) => console.log(err))
  },
  deleteReaction(req,res) {
    Thought.findByIdAndUpdate({_id:req.params.thoughtId},{$pull:{reactions: {_id: req.body.reactionId}}})
    .then((resp)=> res.json(resp))
    .catch((err)=> console.log(err))
  }
};
