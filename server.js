const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost/social-Network',
	{
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
