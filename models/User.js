const { type } = require('express/lib/response');
const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: 'username is Required',
			trim: true,
		},

		email: {
			type: String,
			required: 'email is Required',
			unique: true,
			match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
		},

		thoughts: {
			_id: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Thought',
				},
			],
		},
		friends: {
			_id: [
				{
					type: Schema.Types.ObjectId,
					ref: 'User',
				},
			],
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

UserSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
