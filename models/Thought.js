const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type:String,
            unique:true,
            maxLength: 280,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //get: this will format it <>
        },
        username: {
            type:String,
            required: 'You must include username in request'
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id:false
    }
);

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type:String,
            unique:true,
            maxLength: 280,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //get: this will format it <>
        },
        username: {
            type:String,
            required: 'You must include username in request'
        },
        reactions:[
            ReactionSchema
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

const Thought = model ('Thought', ThoughtSchema);
module.exports = Thought;