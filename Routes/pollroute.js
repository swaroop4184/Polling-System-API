const express = require('express');
const router = express.Router();
const pollController = require('../Controller/pollController');

// Route for creating a poll
router.post('/questions/create', pollController.createPoll);

// Route for creating an option for a specific poll
router.post('/questions/:id/options/create', pollController.createOption);

// Route for deleting a poll by its ID
router.delete('/questions/:id/delete', pollController.deletePoll);

// Route for deleting an option by its ID
router.delete('/options/:id/delete', pollController.deleteOption);

// Route for adding a vote to an option by its ID
router.get('/options/:id/add_vote', pollController.addVote);

// Route for getting a poll by its ID
router.get('/questions/:id', pollController.getPollById);

// Exporting the router to be used in the main application
exports.router = router;
