const { Router } = require('express');
const authRoutes = require('./authRoutes');
const sentimentController = require('../controllers/sentimentController');
const { validateSentimentAnalysis } = require('../validators/sentimentValidator');

const router = Router();

// Authentication Endpoints
router.use('/auth', authRoutes);


// Health Check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'brandpulse-backend' });
});

// Sentiment Endpoints
router.post(
  '/sentiment/analyze',
  validateSentimentAnalysis,
  sentimentController.analyze
);

router.get(
  '/sentiment/recent',
  sentimentController.getRecent
);

module.exports = router;
