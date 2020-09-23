const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: String,
    content: String,
    votes: Number,
    comments: {
        name: String,
        email: String,
        comment: String,
        commentDate: Date
    }
}, {
    timestamps: true
});

articleSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;