const {User, Thought} = require('../models');

const userController = {
    //-----For Users
    //----GET
    getAllUsers(req,res) {
        User.find({})
        .populate({
            path: 'friends',
            select: "-__v -friends -thoughts"
        })
        .select('-__v')
        .then(response => res.json(response))
        .catch(err => {
            console.log('Error');
            res.status(400).json(err);
        });
    },

    getUserById({params},res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'friends',
            select: "-__v -friends -thoughts"
        })
        .select('-__v')
        .then(response => {
            if (!response) {
                res.status(404).json({message: 'User nor found'});
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
    createUser({body},res) {
        User.create(body)
        .then(response => res.json(response))
        .catch(err => res.status(404).json(err));
    },

    //-----PUT
    updateUser({params, body}, res) {
        User.findOneAndUpdate(
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
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(response => {
            if (!response) {
                return res.status(404).json({message: "Not Found"});
            }
            return Thought.deleteMany({username: {$eq: response.username}})
        })
        .then(response => {
            if (!response) {
                res.status(404).json({message: "Not Found"});
                return;
            }
            res.json(response)
        })
        .catch(err => res.status(400).json(err));
    },

    //-----For Friends
    //-----POST
    addFriend({params},res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true, runValidators:true}
        )
        .then(response => {
            if (!response) {
                res.status(404).json({message: "Not Found"});
                return;
            }
            res.json(response);
        })
        .catch(err => res.status(400).json(err));
    },
    //-----DELETE
    removeFriend({params},res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true, runValidators:true}
        )
        .then(response => {
            if (!response) {
                res.status(404).json({message: "Not Found"});
                return;
            }
            res.json(response);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController