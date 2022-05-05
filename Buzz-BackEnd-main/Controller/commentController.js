const commentModel = require('../Model/commentModel');

async function createComment(req, res) {
    //console.log('createComment called');
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
    //console.log('getComments called');
    try {
        let {id} = req.params;
        const postComments = await commentModel.find({ post:id });
        if(postComments){
            res.json(postComments);
        }else{
            res.json("comment not found")
        }
    } catch(err) {
        res.status(500).json(err.message);
    }

}

async function deleteComment(req , res){
    try{
        const {commentId} = req.body;
        let comment = await commentModel.findById(commentId);
        if(comment){
            await comment.deleteOne();
            res.status(200).json("comment has been deleted");
        }else{
            res.status(200).json("comment not found")
        }
    }catch(err){
        res.send(500).json(err.message)
    }
}

module.exports = {
    createComment,
    getComments,
    deleteComment
}