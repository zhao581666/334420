const express = require('express');
const router = express.Router();
const { submitMessage, getMessages, deleteMessage } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// Public route
router.post('/', submitMessage);

// Protected routes (admin)
router.get('/', protect, getMessages);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
