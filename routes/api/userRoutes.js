const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addNewFriend,
  deleteFriend
} = require('../../controllers/userController');

const User = require('../../models/User')

const userId = User.find({},{_id:1})

console.log(userId,'99999999999999999')




// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendsId').post(addNewFriend).delete(deleteFriend)


module.exports = router;
