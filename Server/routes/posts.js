import express from 'express';
import {getPostsBySearch,getPosts,createPost, updatePost,deletePost,likePost,getPost,commentPost} from '../controllers/posts.js'; // This is a name export not a default one hence using name
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search',getPostsBySearch);
router.get('/',getPosts);
router.get('/:id',getPost);
router.post('/',auth,createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost',auth,likePost);
router.post('/:id/commentPost',auth,commentPost);

// the auth middleware is needed here because we don't want a user to like a post multiple times. With this we can make sure that a like belongs to a particular user.


export default router;