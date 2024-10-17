const shortID = require("shortid");
const { Url } = require('../models'); 
const { UrlService } = require('../services');
const urlService = new UrlService();

// Handle Short URL Creation
async function handleShortURL(req, res) {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "URL is required." });
  }

  try {
    const newUrl = await urlService.createShortURL(longUrl, req.user.email);

    return res.status(201).json({
      message: "URL created successfully",
      shortId: newUrl.shortId,
      redirectUrl: newUrl.redirectUrl,
    });
  } catch (error) {
    console.error("Error creating URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  console.log(shortId);
  const result = await Url.findOne({ where: { shortId } });
  if (!result) {
    return res.status(404).json({ error: "URL not found" });
  }
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleRedirect(req, res) {
  const { shortId } = req.params;
  console.log('Received shortId:', shortId);

  try {
    // Call the service to get the URL data
    const urlData = await urlService.getUrlByShortId(shortId);
    console.log('Found URL Data:', urlData);

    if (!urlData) {
      return res.status(404).json({ error: "URL not found" });
    }

    // Redirect to the original URL
    res.redirect(urlData.redirectUrl);
  } catch (error) {
    console.error("Error in handleRedirect:", error);
    res.status(500).json({ error: "Server error" });
  }
}


async function handleGetUserUrls(req, res) {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ error: "Unauthorized: No user found" });
    }

    const urls = await urlService.getUserUrlsByEmail(req.user.email);

    return res.json(urls);
  } catch (error) {
    console.error("Error fetching user URLs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}



module.exports = {
  handleShortURL,
  handleGetAnalytics,
  handleRedirect,
  handleGetUserUrls,
};
