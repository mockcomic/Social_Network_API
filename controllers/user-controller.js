const { User, Thought } = require('../models');

const userController = {
	async getAllUsers(req, res) {
		try {
			const userData = await User.find({});
			res.json(userData);
		} catch (error) {
			res.status(400).json(error);
		}
	},

	async createUser({ body }, res) {
		try {
			const userData = await User.create(body);
			res.json(userData);
		} catch (error) {
			res.status(400).json(error);
		}
	},

	async addNewFriend({ params }, res) {
		try {
			const userData = await User.findOneAndUpdate(
				{
					_id: params.userId,
				},
				{ $push: { friends: params.friendId } },
				{
					runValidators: true,
					new: true,
				}
			);
			if (!userData) {
				return res.status(404).json({ message: 'Invalid user id!' });
			}
			res.json(userData);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	async getUserById({ params }, res) {
		try {
			const userData = await User.findOne({ _id: params.id })
				.populate({ path: 'thoughts', select: '-__v' })
				.populate({ path: 'friends', select: '-__v' });
			res.json(userData);
		} catch (error) {
			res.sendStatus(400);
		}
	},

	async updateUserById({ params, body }, res) {
		try {
			const userData = await User.findOneAndUpdate({ _id: params.id }, body, {
				new: true,
				runValidators: true,
			});
			if (!userData) {
				res.status(404).json({ message: 'Invalid user id!' });
				return;
			}
			res.json(userData);
		} catch (error) {
			res.status(400).json(error);
		}
	},

	async deleteUserById({ params }, res) {
		try {
			const userData = await User.findOneAndDelete({ _id: params.id });
			const userDataDelete = await Thought.deleteMany({
				_id: { $in: userData.thoughts },
			});
			res.json(userDataDelete);
		} catch (error) {
			res.json(error);
		}
	},

	async deleteUserFriend({ params }, res) {
		try {
			const userData = await User.findOneAndUpdate(
				{
					_id: params.userId,
				},
				{ $pull: { friends: params.friendId } },
				{
					runValidators: true,
					new: true,
				}
			);
			if (!userData) {
				return res.status(404).json({ message: 'Invalid user id!' });
			}
			res.json(userData);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = userController;
