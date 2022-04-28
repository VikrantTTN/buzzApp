const userModel = require('../Model/userModel');

// update a user 

async function updateUser(req, res) {
    console.log("update user called");
    try {
        let id = req.params.id;
        const { userId, isAdmin } = req.body
        const { name, password, email, desc } = req.body;
        const dataToUpdate = JSON.parse(JSON.stringify({ name, password, email, desc }));
        if (userId === id || isAdmin) {
            let user = await userModel.findByIdAndUpdate(id, {
                $set: dataToUpdate,
            });
            // if not user -> err 
            if (user) {
                res.status(200).json({
                    message: 'account updated',
                    data: user
                })
            } else {
                res.status(404).json("user not found")
            }
        } else {
            return res.status(400).json("Bad Request")
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
            // if not user -> err
            if (user) {
                res.status(200).json({
                    message: 'user Delete',
                    data: user
                })
            } else {
                res.status(404).json({
                    message: 'user not found',
                })
            }
        } else {
            return res.status(403).json("You can only Delete your account")
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}

// get user

async function getUserById(req, res) {
    console.log("getUserById called");
    try {
        let id = req.params.id;
        let user = await userModel.findById(id).lean();
        // if not user show err 
        if (user) {
            let { password, ...rest } = user;
            res.status(200).json({
                message: rest,
            })
        } else {
            res.status(404).json("user not found")
        }

    } catch (err) {
        res.status(500).json(err.message)
    }
}

// Adding friends 

async function addFriend(req, res) {
    try {
        console.log("addfriend called");
        const toAddFriendId = req.params.id;
        const userId = req.id;
        const toAddFriend = await userModel.findById(toAddFriendId)
        const user = await userModel.findById(userId)
        if (toAddFriendId === userId) {
            res.status(400).json('Bad request');
        } else {
            if (!user.friends.includes(toAddFriendId)) {
                await user.updateOne({ $push: { friends: toAddFriendId } });
                await toAddFriend.updateOne({ $push: { friends: userId } });
                res.status(200).json("You are now friends")
            } else {
                res.status(400).json('You are already friends')
            }
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}

// unFriend a friend

async function unFriend(req, res) {
    try {
        console.log("unfriend called");
        const tounFriendId = req.params.id;
        const userId = req.id;
        const tounFriend = await userModel.findById(tounFriendId)
        const user = await userModel.findById(userId)
        if (tounFriendId === userId) {
            res.status(403).json('UnAuthorized request');
        } else {
            if (user.friends.includes(tounFriendId)) {
                await user.updateOne({ $pull: { friends: tounFriendId } });
                await tounFriend.updateOne({ $pull: { friends: userId } });
                res.status(200).json("You unFriend your friend")
            } else {
                res.status(403).json('You both are not friends')
            }
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
}

// Fetch user friends

async function fetchFriends(req, res) {
    try {
        console.log("fetch Friends called");
        const user = req.user;
        const friendsId = user.friends;
        const friends = await userModel.find({_id : { $in: friendsId }});
        //console.log(friends);
        res.json(friends)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

async function getAllUser(req,res){
    console.log("get all user called");
    try{
        const AllUser = await userModel.find();
        res.json(AllUser);

    }catch(err){
        res.status(500).json(err.message)
    }
}


module.exports = {
    updateUser,
    deleteUser,
    getUserById,
    addFriend,
    unFriend,
    fetchFriends,
    getAllUser
}