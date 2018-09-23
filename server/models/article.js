const mongoose = require('mongoose')
const Schema = mongoose.Schema

var articleSchema = new Schema ({
    title: {
        type: String
    },
    description: {
        type: String
    },
    userId: { 
        type:Schema.Types.ObjectId, 
        ref: 'User' 
    },
    image: {
        type: String
    },
    comments: [{
        userId: { type: Schema.Types.ObjectId, ref: 'user' },
        name: String,
        comment: String,
        date: {
            type: Date,
            default: new Date()
        }
    }, 
    {
        timestamps: true
    }]
},
{
    timestamps: true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article

