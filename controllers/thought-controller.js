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

    //-----POST
    createThought({params, body}, res) {
        console.log(params);
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {comments:_id}},
                {new:true}
            );
        })
        .then(response => {
            if (!response) {
                res.status(404).json({message: "Not Found"});
                return;
            }
            res.json(response);
        })
        .catch(err => res.json(err));
    }

    //-----PUT


    //-----DELETE

    //-----For Reactions
    //-----POST

    //-----DELETE

};

module.exports = thoughtController