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
  for (let i = 0; i <5 ; i++) {
    const username = getRandomName();
    const email = getRandomEmail()
     
    
    users.push({
      username,
      email,
      
    });
  }

//  users.map((items)=> 
//   items['friends'] = friends
//  )


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


  const getThought = async() => {
    const randomNum = Math.floor(Math.random()* 10)
    const thoughtData = await Thought.find({},"_id")

    return thoughtData[randomNum]

  }

  const thoughtData = await getThought()


await User.updateMany({},{$push:{thoughts:thoughtData}})

  //function for adding friends using existing Users'
  const getFriends = async () => {
    try {
      const friendData =  await User.find({},{_id:1,email:1,username:1})
      return friendData

    } catch (err) {
      console.log(err)
    }
  }






  const friends = await getFriends()
  console.log(friends,'LLLLLL')

  await User.updateMany({},{$set:{friends: friends}})



  const getReaction = async () => {
    const thoughtData = await Thought.update({},{$push:{reactions: 
    {
      reactionBody: "This is reaction test",
      username: "Joshua Daniel"
    }
    
    }})
    return thoughtData
  }

  await getReaction()











  console.log(users)
  process.exit(0);
});
