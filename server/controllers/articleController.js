const Article = require('../models/article')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createArticle = (req, res) => {
    let loggedInUser = req.loggedInUser
    Article.create({
        title: req.body.title,
        description: req.body.description,
        userId: loggedInUser._id,
        image: req.body.image
    })
    .then((data) => {
        res.status(201).json({
            message: `successfully create article`,
            data
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}

const getArticle = (req, res) => {
    Article.find({})
    .populate('userId')
    .then((data) => {
        res.status(201).json({
            message: `List of all articles`,
            data
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}

const getOneArticle = (req, res) =>{
    Article.findOne({_id: req.params.id})
    .populate('userId')
    .then((article) => {
        res.status(201).json({
            message: `articles with id ${req.params.id}`,
            data: article
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    });
}

const getMyArticle = (req, res) => {
    let loggedInUser = req.loggedInUser
    console.log('===>',loggedInUser);
    Article.find({
        userId: req.loggedInUser._id
    }).populate('userId')
        .then((data) => {
            res.status(201).json({
                message: `my articles`,
                data
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
}

const editArticle = (req, res) => {
    const { title, description } = req.body
    const dataUpdate = {}
    if(title) dataUpdate.title = title
    if(description) dataUpdate.description = description
    if(image) dataUpdate.image = image
    Article.updateOne({
        _id: req.params.id
    }, dataUpdate)
    .then(() => {
        res.status(201).json({
            message: `success update article`
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}

const deleteArticle = (req, res) => {
    Article.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(201).json({
            message: `success delete article`
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}

const addComment = (req, res) => {
    console.log(req.body);
    console.log(req.headers.token);
    
    const { comment } = req.body
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.jwt_secret)
    Article.update({
        _id: req.params.id
    }, {
        $push: { comments: {UserId: decoded.id, name: decoded.name, comment: comment, date: new Date ()} }
    })
    .then(() => {
        res.status(201).json({
            message: `success add comment`
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    });
}

const deleteComment = (req,res) => {
    Article.update({
        _id: req.params.id
    },{
        $pull: { comments: {_id: req.body.id_comment}}
    })
    .then(() => {
        res.status(201).json({
            message: `success delete comment`
        })
    })
    .catch((err) => {
        
    });
}

module.exports = {
    createArticle,
    getArticle,
    editArticle,
    deleteArticle,
    getMyArticle,
    getOneArticle,
    addComment,
    deleteComment
}