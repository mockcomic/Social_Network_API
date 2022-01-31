const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},

		reactionBody: {
			type: String,
			required: 'reactionBody is Required',
			maxlength: 280,
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
		createdAt: {
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
		id: false,
	}
);

ThoughtSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
