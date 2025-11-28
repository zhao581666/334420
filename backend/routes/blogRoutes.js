const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} = require('../controllers/blogController');
const {
  getComments,
  createComment,
  deleteComment
} = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

// Blog post routes
router.get('/', getBlogPosts);
router.get('/:id', getBlogPostById);
router.post('/', protect, createBlogPost);
router.put('/:id', protect, updateBlogPost);
router.delete('/:id', protect, deleteBlogPost);

// Comment routes
router.get('/:postId/comments', getComments);
router.post('/:postId/comments', protect, createComment);
router.delete('/:postId/comments/:commentId', protect, deleteComment);

module.exports = router;
