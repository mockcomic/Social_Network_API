const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
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

const ThoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			minlength: 1,
			maxlength: 280,
			required: true,
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
			virtuals: true,
			getters: true,
		},
	}
);

ThoughtSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
