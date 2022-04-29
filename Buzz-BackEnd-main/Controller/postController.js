const postModel = require('../Model/postModel');
const userModel = require('../Model/userModel');

// create post
async function createPost(req, res) {
  try {
    const userId = req.id;
    const { caption, image } = req.body
    const post = {
      userId,
      caption,
      image
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

async function getPost(req, res) {
  try {
    let postId = req.params.id;
    let post = await postModel.findById(postId);
    if (post) {
      res.json(post)
    } else {
      res.status(404).json("post not found")
    }
  } catch (err) {
    res.status(500).json(err.message)
  }
}

// update post

async function updatePost(req, res) {
  console.log("update post called");
  try {
    const postId = req.params.id
    const { userId, caption } = req.body;
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
    const userId = req.id;
    const post = await postModel.findById(postId);
    if (post) {
      if (post.userId == userId) {
        await post.deleteOne();
        res.status(200).json("post has been deleted");
      } else {
        res.status(200).json('Bad request');
      }
    } else {
      res.status(500).json('post not found');
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
}

// like/unlike post 

async function likePost(req, res) {
  console.log("like post called");
  try {
    const postId = req.params.id;
    const id = req.id;
    const post = await postModel.findById(postId);
    if (post) {
      if (post.likes.includes(id)) {
        await post.updateOne({ $pull: { likes: id } });
        res.json('post like removed')
      } else {
        await post.updateOne({ $push: { likes: id } });
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

async function feedsPost(req, res) {
  console.log("feedsPost called");
  try {
    const userId = req.id;
    const user = await userModel.findById(userId);
    if (user) {
      const allIds = [...user.friends, user._id];
      const allPost = await postModel.find({ userId: { $in: allIds } });
      //const userPosts = await postModel.find({userId:user._id});
      //console.log(friends);
      // let friendsPost = await Promise.all(friends.map((id)=>{
      //   return postModel.find({userId:id});
      // }))
      //const allPost = userPosts.concat(...friendsPost);
      res.json(allPost);
    } else {
      res.json('no user found')
    }
  } catch (err) {
    res.status(500).json(err.message)
  }
}

// user post 

async function userPost(req, res) {
  console.log("userPost called");
  try {
    const userId = req.id;
    const userPost = await postModel.find({ userId: userId });
    if (userPost) {
      res.json(userPost);
    } else {
      res.json("No Posts")
    }
  } catch (err) {
    res.status(500).json(err.message)
  }
}

//user Post by id 

async function userPostById(req, res) {
  console.log("userPostById called");
  try {
    const userId = req.params.id;
    const userPost = await postModel.find({ userId: userId });
    if (userPost) {
      res.json(userPost);
    } else {
      res.json("No Posts")
    }
  } catch (err) {
    res.status(500).json(err.message)
  }
}



module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  feedsPost,
  userPost,
  userPostById
}