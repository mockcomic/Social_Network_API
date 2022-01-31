const { Thought, User } = require('../models');

const thoughtController = {
	async createThought({ body }, res) {
		try {
			const userData = await Thought.create(body).then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: body.userId },
					{ $push: { thoughts: _id } },
					{ new: true }
				).populate({ path: 'thoughts', select: '-__v' });
			});

			if (!userData) {
				res.status(404).json({ message: 'No user found with this id!' });
				return;
			}
			res.json(userData);
		} catch (error) {
			error => res.json(error);
		}
	},

	async getAllThoughts(req, res) {
		try {
			const thoughtData = await Thought.find({});
			res.json(thoughtData);
		} catch (error) {
			res.status(400).json(error);
		}
	},

	async getThoughtById({ params }, res) {
		try {
			const userData = await Thought.findOne({ _id: params.id });
			res.json(userData);
		} catch (error) {
			res.sendStatus(400);
		}
	},

	async updateThoughtById({ params, body }, res) {
		try {
			const thoughtData = await Thought.findOneAndUpdate(
				{ _id: params.id },
				body,
				{
					new: true,
					runValidators: true,
				}
			);
			if (!thoughtData) {
				res.status(404).json({ message: 'Invalid thought id' });
				return;
			}
			res.json(thoughtData);
		} catch (error) {
			res.status(400).json(error);
		}
	},

	async removeThoughtById({ params }, res) {
		try {
			const thoughtData = await Thought.findOneAndDelete({ _id: params.id });
			if (!thoughtData) {
				return res.status(404).json({ message: 'Invalid thought id' });
			}
			const userData = await User.findOneAndUpdate(
				{ thoughts: params.id },
				{ $pull: { thoughts: params.id } },
				{ new: true }
			);
			if (!userData) {
				res.status(404).json({ message: 'No user found with this id!' });
				return;
			}
			res.json(userData);
		} catch (error) {
			res.json(error);
		}
	},

	async createReaction({ params, body }, res) {
		try {
			const thoughtData = await Thought.findOneAndUpdate(
				{ _id: params.thoughtId },
				{ $push: { reactions: body } },
				{ new: true, runValidators: true }
			);
			if (!thoughtData) {
				res.status(404).json({ message: 'Invalid thought id' });
				return;
			}
			res.json(thoughtData);
		} catch (error) {
			json(error);
		}
	},

	async removeReaction({ params }, res) {
		try {
			const thoughtData = await Thought.findOneAndUpdate(
				{ _id: params.thoughtId },
				{ $pull: { reactions: { reactionId: params.reactionId } } },
				{ new: true }
			);
			if (!thoughtData) {
				res.status(404).json({ message: 'Invalid thought id' });
				return;
			}
			res.json(thoughtData);
		} catch (error) {
			json(error);
		}
	},
};

module.exports = thoughtController;
