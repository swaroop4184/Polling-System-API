// pollController.js
// Assuming the file name for the model is Poll.js
const model = require('../Model/Poll')

const Poll = model.Poll;

// Create a new poll
exports.createPoll = async (req, res) => {
  try {
    const poll = new Poll(req.body);
    const savepoll = await poll.save();
    res.status(201).send(poll);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Create an option for a specific poll
exports.createOption = async (req, res) => {
  try {
    const baseURL = req.protocol + '://' + req.get('host'); 

    const poll = await Poll.findById(req.params.id);
    poll.options.push({ ...req.body, link_to_vote: '' });
    const savepoll= await poll.save();
    const nextOption = savepoll.options.find(option => option.text === req.body.text);
    if (nextOption) {
      await pushVoteLinkToOptions(req.params.id, nextOption._id, baseURL);
      console.log(nextOption);
      console.log(savepoll);
      res.status(201).send(poll);
    } else {
      throw new Error('Option not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Generate vote link for an option and update the poll
const generateVoteLink = (baseURL, optionId) => {
    return `${baseURL}/options/${optionId}/add_vote`;
};

// Update the poll with the vote link for the option
const pushVoteLinkToOptions = async (pollId, optionId, baseURL) => {
    try {
      const poll = await Poll.findById(pollId);
      const optionToUpdate = poll.options.id(optionId);
      if (optionToUpdate) {
        optionToUpdate.link_to_vote = generateVoteLink(baseURL, optionId);
        await poll.save();
      } else {
        throw new Error('Option not found');
      }
    } catch (error) {
      throw error;
    }
};

// Delete a poll
exports.deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findByIdAndDelete(req.params.id);
    res.status(200).send(poll);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete an option from a poll
// exports.deleteOption = async (req, res) => {
//   try {
//     const poll = await Poll.findOne({ 'options._id': req.params.id });
//     poll.options.remove(id(req.params.id));
//     const deleteOptionpoll= await poll.save();
//     res.status(200).send(poll);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

exports.deleteOption = async (req, res) => {
  try {
    const poll = await Poll.findOne({ 'options._id': req.params.id });

    // Check if the poll exists
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    // Use the pull method to remove the option by its _id
    poll.options.pull(req.params.id);

    // Save the updated poll
    const updatedPoll = await poll.save();

    res.status(200).json(updatedPoll);
  } catch (error) {
    console.error('Error deleting option:', error);
    res.status(500).send(error.message);
  }
};

// Add a vote to an option
exports.addVote = async (req, res) => {
  try {
    const poll = await Poll.findOne({ 'options._id': req.params.id });
    poll.options.id(req.params.id).votes++;
    const savepollvote= await poll.save();
    res.status(200).send(poll);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get a poll by its ID
exports.getPollById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    res.status(200).send(poll);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
