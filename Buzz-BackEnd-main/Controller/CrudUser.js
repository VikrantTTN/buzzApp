const userModel = require('../userModel/userModel');

// update a user 

async function updateUser(req, res) {
    console.log("update user");
    try {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            let id = req.params.id
            let user = await userModel.findByIdAndUpdate(id, {
                $set: req.body,
            });
            console.log(user);
            res.status(200).json({
                message: 'account updated',
                data: user
            })
        } else {
            return res.status(403).json("You can only update your account")
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}

// delete user


async function deleteUser(req, res) {
    try {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            let id = req.params.id
            let user = await userModel.findByIdAndDelete(id)
            res.status(200).json({
                message: 'user Delete',
                data: user
            })
        } else {
            return res.status(403).json("You can only Delete your account")
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}

// get user

async function getaUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        let {password , ...other} = user._doc;
        res.status(200).json({
            message:'user found',
            data : other
        })

    } catch (err) {
        res.status(500).json(err.message)
    }
}

// Adding friends 

async function addFriend(req , res){
   try{
    console.log("addfriend called");
    const toAddFriendId = req.params.id ;
    const userId = req.body.userId
    const toAddFriend = await userModel.findById(toAddFriendId)
    const user = await userModel.findById(userId) 
    if( toAddFriendId === userId){
        res.status(403).json('UnAuthorized request');
    }else{
        if(!user.friends.includes(toAddFriendId)){
            await user.updateOne({$push: {friends:toAddFriendId}});
            await toAddFriend.updateOne({$push: {friends:userId}});
            res.status(200).json("You are now friends")
        }else{
            res.status(403).json('You are already friends')
        }
    }
   }catch(err){
       res.status(500).json(err.message)
   }
}

// unFriend a friend

async function unFriend(req , res){
    try{
     console.log("unfriend called");
     const tounFriendId = req.params.id ;
     const userId = req.body.userId
     const tounFriend = await userModel.findById(tounFriendId)
     const user = await userModel.findById(userId) 
     if( tounFriendId === userId){
         res.status(403).json('UnAuthorized request');
     }else{
         if(user.friends.includes(tounFriendId)){
             await user.updateOne({$pull: {friends:tounFriendId}});
             await tounFriend.updateOne({$pull: {friends:userId}});
             res.status(200).json("You unFriend your friend")
         }else{
             res.status(403).json('You both are not friends')
         }
     }
    }catch(err){
        res.status(500).json(err.message)
    }
 }
 


module.exports = {
    updateUser,
    deleteUser,
    getaUser,
    addFriend,
    unFriend
}