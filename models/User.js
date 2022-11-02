const { Schema, model } = require('mongoose');

const UserSchema = new Schema (
    {
        username: {
            type:String,
            unique:true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique:true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'You must enter a valid email adress']
        },
        thoughts: [],
        friends:[
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id:false
    }
);

const User = model ('User', UserSchema);
module.exports = User;