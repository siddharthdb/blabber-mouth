const express = require("express");
const Article = require('../models/articles');

const router = express.Router();

/**
 * get all articles or search by query param
 */
router.get("/articles", (req, res) => {
    let title = req.query.title;
    let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Article.find(condition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error occured in retrieving articles!",
            });
        });
});

/**
 * Get Article by Id
 */
router.get("/articles/:id", (req, res) => {
    let articleId = req.params.id;

    Article.findById(articleId)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: "Article not found!",
                });
            } else {
                res.send(data);
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error occured in retrieving article!",
            });
        });
});

/**
 * Add New Article
 */
router.post("/articles", (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.content || !req.body.publishedDate) {
        res.status(400).send({ message: "Invalid Request. Please check you inputs" });
        return;
    }

    let article = {
        title: req.body.title,
        content: req.body.content,
        publishedDate: req.body.publishedDate,
    };

    let newArticle = new Article();
    newArticle.title = req.body.title;
    newArticle.content = req.body.content;
    newArticle.publishedDate = req.body.publishedDate;

    newArticle
        .save(article)
        .then((response) => {
            res.status(200).send(newArticle);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error in adding new article!",
            });
        });
});

/**
 * Update upvotes to article 
 */
router.put("/articles/:id/upvote", (req, res) => {
    let articleId = req.params.id;

    Article.updateOne({ "_id": articleId }, { $inc: { votes: 1 } })
        .then((data) => {
            res.status(200).send({ message: "Success" });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error in upvoting article!",
            });
        });
})

module.exports = router;