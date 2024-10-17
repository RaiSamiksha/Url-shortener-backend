const express = require('express');
const { urlController } = require('../../controller');  // Access via controller index

const router = express.Router();

router.post('/shorten', urlController.handleShortURL);  // Example route for creating a short URL
router.get('/analytics/:shortId', urlController.handleGetAnalytics);
router.get('/redirect/:shortId', urlController.handleRedirect);
router.get('/user-urls', urlController.handleGetUserUrls);

module.exports = router;
