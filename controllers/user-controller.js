const {User} = require('../models');

const userController = {

    getAllUsers(req,res) {
        User.find({})
        .then(response => res.json(response))
        .catch(err => {
            console.log('Error');
            res.status(400).json(err);
        });
    },
}

module.exports = userController