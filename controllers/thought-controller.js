const { response } = require('express');
const {User, Thought} = require('../models');

const thoughtController = {
    //-----For Thoughts
    //----GET
    getAllThoughts(req,res) {
        Thought.find({})
        .then(response => res.json(response))
        .catch(err => {
            console.log('Error');
            res.status(400).json(err);
        });
    },

    getThoughtById({params},res) {
        Thought.findOne({_id: params.id})
        .select('-__v')
        .then(response => {
            if (!response) {
                res.status(404).json({message: 'THought nor found'});
                return;
            }
            res.json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //-----POST
    createThought({params, body}, res) {
        console.log(params);
        console.log(body);
        // Thought.remove()
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts:_id}},
                {new:true}
            )
        })
        .then(response => {
            if (!response) {
                res.status(404).json({message: "Not Found"});
                return;
            }
            res.json(response);
        })
        .catch(err => res.json(err));
    },

    //-----PUT
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true, runValidators:true}
        )
        .then(response => {
            if (!response) {
                res.status(404).json({message: "Not Found"});
                return;
            }
            res.json(response)
        })
        .catch(err => res.status(400).json(err));
    },

    //-----DELETE
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.thoughtId})
        .then(response => {
            if (!response) {
                return res.status(404).json({message: "Not Found"});
                
            }
            console.log(params.thoughtId);
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {thoughts: params.thoughtId}},
                {new: true}
            );
        })
        .then(response => {
            if (!response) {
                res.status(404).json({message: "Not Found"});
                return;
            }
            res.json(response);
        })
        .catch(err => res.status(400).json(err));
    },

    //-----For Reactions
    //-----POST

    //-----DELETE

};

module.exports = thoughtController