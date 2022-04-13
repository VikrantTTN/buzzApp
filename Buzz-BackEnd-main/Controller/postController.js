const postModel = require('../userModel/postModel');
const userModel = require('../userModel/userModel');

// create post
async function createPost(req, res) {
  try {
    const {userId , caption} =  req.body
    const post = {
      userId,
      caption
    }
    const createPost = await postModel.create(post);
    res.json({
      message: 'post created',
      data: createPost
    })
  } catch (err) {
    res.status(500).json(err.message)
  }
}

//get post 

async function getPost(req, res){
  try{
    let postId = req.params.id;
    let post = await postModel.findById(postId);
    if(post){
      res.json(post)
    }else{
      res.status(404).json("post not found")
    }
  }catch(err){
    res.status(500).json(err.message)
  }
}

// update post

async function updatePost(req, res) {
  console.log("update post called");
  try {
    const postId = req.params.id
    const { userId , caption } = req.body;
    const dataToUpdate = JSON.parse(JSON.stringify({ caption }));
    const post = await postModel.findById(postId);
    if (post) {
      if (post.userId === userId) {
        await post.updateOne({ $set: dataToUpdate });
        res.status(200).json("post has been updated")
      } else {
        res.status(400).json('Bad request')
      }
    } else {
      res.status(500).json('post not found')
    }
  } catch (err) {
    res.status(500).json(err.message)
  }
}

// Delete post

async function deletePost(req, res) {
  console.log("delete post called");
  try {
    const postId = req.params.id;
    const { userId } = req.body;
    const post = await postModel.findById(postId);
    if (post) {
      if (post.userId === userId) {
        await post.deleteOne();
        res.status(200).json("post has been deleted");
      } else {
        res.status(400).json('Bad request');
      }
    } else {
      res.status(500).json('post not found');
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
}

// like post 

async function likePost(req, res) {
  console.log("like post called");
  try {
    const postId = req.params.id;
    const { userId } = req.body
    const post = await postModel.findById(postId);
    if (post) {
      if (post.likes.includes(userId)) {
        await post.updateOne({ $pull: { likes: userId } });
        res.json('post like removed')
      } else {
        await post.updateOne({ $push: { likes: userId } });
        res.json('post liked');
      }
    } else {
      res.status(404).json('post not found')
    }
  } catch (err) {
    res.status(500).json(err.message)
  }
}

// feeds post

async function feedsPost(req , res){
  console.log("feedsPost");
 try{
  const {userId} = req.body;
  const user = await userModel.findById(userId);
  if(user){
    const allIds= [...user.friends, user._id];
    const allPost = await postModel.find({ userId: {$in: allIds } });
    //const userPosts = await postModel.find({userId:user._id});
    //console.log(friends);
    // let friendsPost = await Promise.all(friends.map((id)=>{
    //   return postModel.find({userId:id});
    // }))
    //const allPost = userPosts.concat(...friendsPost);
    res.json(allPost);
  }else{
    res.json('no user found')
  }
 }catch(err){
   res.status(500).json(err.message)
 }
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  feedsPost
}