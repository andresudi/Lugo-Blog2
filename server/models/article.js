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
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        name: String,
        comment: String,
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

