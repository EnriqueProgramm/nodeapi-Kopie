const express = require('express');
const { requireSignin } = require('../controllers/auth')
const {getPost, createPost, postByUser, postById, isPoster, deletePost, updatePost, photo, singlePost, like, unlike, comment, uncomment} = require('../controllers/post')
const { userById } = require("../controllers/user");
const router = express.Router();
const {createPostValidator} = require('../validator')


router.get("/posts", getPost);
router.put("/post/like", requireSignin, like);
router.put("/post/unlike", requireSignin, unlike);

// comments
router.put("/post/comment", requireSignin, comment);
router.put("/post/uncomment", requireSignin, uncomment);


router.get("/post/:postId", singlePost);
router.post("/post/new/:userId", requireSignin, createPost, createPostValidator);
router.get("/posts/by/:userId", requireSignin, postByUser);
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);




// Photo
router.get("/post/photo/:postId", photo);

//any route containing :userId, our app will first execute userById()
router.param("userId", userById);

//any route containing :postById, our app will first execute postById()
router.param("postId", postById);

module.exports = router;







