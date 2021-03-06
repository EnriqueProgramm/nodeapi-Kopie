const express = require('express');
const {userById, allUsers, getUser, updateUser, deleteUser, userPhoto, addFollowing, addFollower, removeFollowing, removeFollower, findPeople} = require("../controllers/user");
const router = express.Router();
const { requireSignin } = require('../controllers/auth')

router.put('/user/follow', requireSignin, addFollowing, addFollower);

router.put('/user/unfollow', requireSignin, removeFollowing, removeFollower);

router.get("/users", allUsers);

router.get("/user/:userId", requireSignin, getUser);

router.put("/user/:userId", requireSignin, updateUser);


// Photo
router.get("/user/photo/:userId", userPhoto);


// who to follow

router.get('/user/findpeople/:userId', requireSignin, findPeople)
router.delete("/user/:userId", requireSignin, deleteUser);

// any route containing :userId, our app will first execute UserById()
router.param("userId", userById);

module.exports = router;

