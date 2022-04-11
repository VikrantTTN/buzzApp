const postModel = require('../userModel/postModel');

async function createPost(req,res){
  try{
    const post = req.body;
    const createdPost = await postModel.create(post);
    res.json({
        message:'post created',
        data : createPost
    })
  }catch(err){
      res.status(500).json(err.message)
  }
}

module.exports={
    createPost
}