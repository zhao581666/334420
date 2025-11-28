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

// Comment routes (must be before /:id routes to avoid conflicts)
router.get('/:postId/comments', getComments);
router.post('/:postId/comments', protect, createComment);
router.delete('/:postId/comments/:commentId', protect, deleteComment);

// Blog post routes
router.get('/', getBlogPosts);
router.get('/:id', getBlogPostById);
router.post('/', protect, createBlogPost);
router.put('/:id', protect, updateBlogPost);
router.delete('/:id', protect, deleteBlogPost);

module.exports = router;
