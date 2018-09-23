const Article = require("../models/article");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createArticle = (req, res) => {
  let loggedInUser = req.loggedInUser;
  Article.create({
    title: req.body.title,
    description: req.body.description,
    userId: loggedInUser._id,
    image: req.body.image
  })
    .then(data => {
      res.status(201).json({
        message: `successfully create article`,
        data
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const getArticle = (req, res) => {
  Article.find({})
    .populate("userId")
    .sort({ createdAt: "desc" })
    .then(data => {
      res.status(201).json({
        message: `List of all articles`,
        data
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const getOneArticle = (req, res) => {
  Article.findOne({ _id: req.params.id })
    .populate("userId")
    .then(article => {
      res.status(201).json({
        message: `articles with id ${req.params.id}`,
        data: article
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const getMyArticle = (req, res) => {
  let loggedInUser = req.loggedInUser;
  console.log("===>", loggedInUser);
  Article.find({
    userId: req.loggedInUser._id
  })
    .populate("userId")
    .sort({ createdAt: "desc" })
    .then(data => {
      res.status(201).json({
        message: `my articles`,
        data
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const editArticle = (req, res) => {
  const { title, description } = req.body;
  let loggedInUser = req.loggedInUser;
  Article.findOne({
    _id: req.params.id
  })
    .then(data => {
      if (data) {
        if (String(data.userId) == String(loggedInUser._id)) {
          const dataUpdate = {};
          if (title) dataUpdate.title = title;
          if (description) dataUpdate.description = description;
          Article.updateOne(
            {
              _id: req.params.id
            },
            dataUpdate
          )
            .then(() => {
              res.status(201).json({
                message: `success update article`
              });
            })
            .catch(err => {
              res.status(400).json({
                message: err.message
              });
            });
        } else {
          res.status(400).json({
            message: `You don't have access to do this action!`
          });
        }
      } else {
        res.status(400).json({
          message: `Data Not Found`
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const deleteArticle = (req, res) => {
  let loggedInUser = req.loggedInUser;
  Article.findOne({
    _id: req.params.id
  })
    .then(data => {
      if (data) {
        if (String(data.userId) == String(loggedInUser._id)) {
          Article.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(201).json({
                message: `success delete article`
              });
            })
            .catch(err => {
              res.status(400).json({
                message: err.message
              });
            });
        } else {
          res.status(400).json({
            message: `You don't have access to do this action!`
          });
        }
      } else {
        res.status(400).json({
          message: `Data Not Found`
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const addComment = (req, res) => {
  const { comment } = req.body;
  let loggedInUser = req.loggedInUser;
  Article.update(
    {
      _id: req.params.id
    },
    {
      $push: {
        comments: {
          userId: loggedInUser.id,
          name: loggedInUser.name,
          comment: comment
        }
      }
    }
  )
    .then(() => {
      res.status(201).json({
        message: `success add comment`
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const deleteComment = (req, res) => {
  console.log(req.params);
  let loggedInUser = req.loggedInUser;
  Article.findOne({
    _id: req.params.id
  })
    .then(data => {
      if (data) {
        if (String(data.userId) == String(loggedInUser._id)) {
          Article.update(
            {
              _id: req.params.id
            },
            {
              $pull: { comments: { _id: req.params.idComment } }
            }
          )
            .then(() => {
              res.status(201).json({
                message: `success delete comment`
              });
            })
            .catch(err => {
              res.status(400).json({
                message: err.message
              });
            });
        } else {
          res.status(400).json({
            message: `You don't have access to do this action!`
          });
        }
      } else {
        res.status(400).json({
          message: `Data Not Found`
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

module.exports = {
  createArticle,
  getArticle,
  editArticle,
  deleteArticle,
  getMyArticle,
  getOneArticle,
  addComment,
  deleteComment
};
