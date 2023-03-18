const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomName, getRandomEmail, getRandomThought } = require("./data");

console.log(getRandomName());
connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // await Post.deleteMany({});
  await User.deleteMany({});
  await Thought.deleteMany({});

  //Creating users
  const createUsers = () => {
    const users = [];

    for (let i = 0; i < 2; i++) {
      const username = getRandomName();
      const email = getRandomEmail();
      users.push({
        username,
        email,
      });
    }
    return users;
  };
  //Creating Thoughts
  const createThoughts = () => {
    const thoughts = [];

    for (let i = 0; i < 2; i++) {
      const thoughtText = getRandomThought();
      const username = getRandomName();
      thoughts.push({
        thoughtText,
        username,
      });
    }

    return thoughts;
  };

  // Inserting Datas into Each of models
  await User.collection.insertMany(createUsers());
  await Thought.collection.insertMany(createThoughts());

  //function to get random thoughts from database
  const insertThoughts = async () => {
    const thoughtData = await Thought.find({}, "_id");
    return thoughtData[Math.floor(Math.random() * thoughtData.length)];
  };

  //result thought
  const thought = await insertThoughts();

  //inserting the random thought into users
  await User.update({}, { $set: { thoughts: thought } });


  //function for adding friends using existing Users'
  const getFriends = async () => {
    try {
      const friendData = await User.find({}, { _id: 1, email: 1, username: 1 });
      return friendData;
    } catch (err) {
      console.log(err);
    }
  };
  // result friends
  const friends = await getFriends();
  //inserting friends into users
  await User.updateMany({}, { $set: { friends: friends } });

  //Reactions


  //function for making Reactions for thoughts
  const getReaction = async () => {
    const thoughtData = await Thought.update(
      {},
      {
        $push: {
          reactions: {
            reactionBody: getRandomThought(),
            username: getRandomName(),
          },
        },
      }
    );
    return thoughtData;
  };


  //result Reaction
  await getReaction();

  console.log(createUsers());
  process.exit(0);
});
