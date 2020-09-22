const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: String,
    content: String,
    publishDate: String,
    votes: Number
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