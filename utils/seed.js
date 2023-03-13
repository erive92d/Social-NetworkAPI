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


  const getRandomFriend = async () => {
    let arrayFriends = [];
    const getFriend = await User.find({},'_id')
    arrayFriends.push(getFriend)
    return arrayFriends

  }

  let friends = getRandomFriend()
  

  console.log(friends)


  //User

  // let friends = await getRandomFriend()
  for (let i = 0; i < 20; i++) {
    const username = getRandomName();
    const email = getRandomEmail()
     
    
    users.push({
      username,
      email,
    });
  }

 users.map((items)=> 
  items['friends'] = friends
 )

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
