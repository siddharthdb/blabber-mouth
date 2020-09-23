const express = require("express");
const Article = require('../models/articles');

const router = express.Router();

/**
 * get all articles or search by query param
 */
router.get("/articles", async(req, res) => {
    let title = req.query.title;
    let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    try {
        let articles = await Article.find(condition).sort({ createdAt: -1 }).limit(5);
        if (articles)
            res.send(articles);
        else
            res.status(404).send(`No Articles were found for the title - ${title}`)
    } catch (error) {
        res.status(500).send({
            message: err.message || "Error occured in retrieving articles!",
        });
    }
});

/**
 * Get Article by Id
 */
router.get("/articles/:id", async(req, res) => {
    let articleId = req.params.id;

    try {
        let article = await Article.findById(articleId)

        if (!article) {
            res.status(404).send({
                message: "Article not found!",
            });
        } else {
            res.send(article);
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error occured in retrieving article!",
        });
    }
});

/**
 * Add New Article
 */
router.post("/articles", async(req, res) => {
    // Validate request
    if (!req.body.title || !req.body.content) {
        res.status(400).send({ message: "Invalid Request. Please check you inputs" });
        return;
    }

    let newArticle = new Article();
    newArticle.title = req.body.title;
    newArticle.content = req.body.content;
    newArticle.votes = 1;

    try {
        let result = await newArticle.save();
        if (result)
            res.status(200).send(result);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error occured in creating new article!",
        });
    }


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

/**
 * Add User Comments
 */

router.put("/articles/:id/comments", (req, res) => {
    let articleId = req.params.id;

    if (!req.body.email || !req.body.name || !req.body.comment || !req.body.commentDate) {
        res.status(400).send({ message: "Invalid request. Please check all 4 (name, email, commentDate and comment) are required." })
    }

    let acomm = {
        email: req.body.email,
        name: req.body.name,
        comment: req.body.comment,
        commentDate: req.body.commentDate
    }

    Article.updateOne({ "_id": articleId }, { $push: { comments: acomm } })
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