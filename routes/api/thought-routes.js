const router = require('express').Router();
const {
	createThought,
	getAllThoughts,
	getThoughtById,
	updateThoughtById,
	removeThoughtById,
	createReaction,
	removeReaction,
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts).post(createThought);

router
	.route('/:id')
	.get(getThoughtById)
	.put(updateThoughtById)
	.delete(removeThoughtById);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;
