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
  let friends = []
  const users = [];
  const thoughts = []
  User.find({},'_id')
    .then((res)=>friends = [res])


  //User
  for (let i = 0; i < 20; i++) {
    const username = getRandomName();
    const email = getRandomEmail()
     
    
    users.push({
      username,
      email,
      friends
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
  console.log(users);
  process.exit(0);
});
