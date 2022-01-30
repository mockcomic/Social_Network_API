const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: 'thoughtText is Required',
			validate: [
				({ length }) => length >= 1 && length <= 280,
				'Must be between 1 and 280 characters.',
			],
		},
		userCreated: {
			type: Date,
			default: Date.now,
			get: createdAtVal => dateFormat(createdAtVal),
		},
		username: {
			type: String,
			unique: true,
			required: 'username is Required',
			trim: true,
		},
		reactions: [ReactionSchema],
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

const ReactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: Schema.Types.ObjectId,
		},

		reactionBody: {
			type: String,
			required: 'reactionBody is Required',
			validate: [
				({ length }) => length <= 280,
				'Must not exceed 280 characters.',
			],
		},

		username: {
			type: String,
			required: 'username is Required',
			trim: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: createdAtVal => dateFormat(createdAtVal),
		},
	},
	{
		toJSON: {
			getters: true,
		},
		id: false,
	}
);

ThoughtSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
