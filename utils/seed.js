const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomEmail, getRandomThought } = require('./data');

console.log(getRandomName());
connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // await Post.deleteMany({});
  await User.deleteMany({});
  await Thought.deleteMany({});
 
  const users = [];
  const thoughts = []
 



  //User
  for (let i = 0; i < 20; i++) {
    const username = getRandomName();
    const email = getRandomEmail()
     
    
    users.push({
      username,
      email,
      
    });
  }

  //Thought
  for (let i = 0; i < 20; i++) {
    const thoughtText = getRandomThought();
    const username = getRandomName()
    thoughts.push({
      thoughtText,
      username
      
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts)

  const getFriends = async () => {
    try {
      const friendData =  await User.find({},'_id')
      return friendData

    } catch (err) {
      console.log(err)
    }
  }

  const friends = await getFriends()
  console.log(friends,'LLLLLL')

  await User.update({},{$set:{friends: friends}})
  console.log(users)
  process.exit(0);
});
