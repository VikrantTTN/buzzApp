const commentModel = require('../Model/commentModel');

async function createComment(req, res) {
    console.log('createComment called');
    try {
        let { comment, post, } = req.body;
        let user = req.id;
        let objComment = {
            comment,
            user,
            post
        }

        const createComment = await commentModel.create(objComment);
        res.json(createComment);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

async function getComments(req, res) {
    console.log('getComments called');
    try {
        let postId = req.params
        const postComments = await commentModel.find({ postId });
        res.json(postComments);
    } catch {
        res.status(500).json(err.message);
    }

}

module.exports = {
    createComment,
    getComments
}