const router = require('express').Router();
const {
	getAllUsers,
	createUser,
	getUserById,
	updateUserById,
	deleteUserById,
	addNewFriend,
	deleteUserFriend,
} = require('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(createUser);

router
	.route('/:id')
	.get(getUserById)
	.put(updateUserById)
	.delete(deleteUserById);

router
	.route('/:userId/friends/:friendId')
	.post(addNewFriend)
	.delete(deleteUserFriend);

module.exports = router;
