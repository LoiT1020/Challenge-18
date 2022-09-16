const { Thought, User } = require('../models');

const thoughtController = {
  // add thought to USer
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.json(err));
  },
  // remove thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;