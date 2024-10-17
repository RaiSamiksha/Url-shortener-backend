const { Url } = require("../models");
const shortID = require("shortid"); // Assuming you're using shortid for ID generation

async function getUserUrlsByEmail(email) {
  try {
    return await Url.findAll({ 
        where: { createdBy: email },
        attributes: ['shortId', 'redirectUrl', 'visitHistory'],
     });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    throw new Error("Could not fetch URLs for the provided email.");
  }
}

async function createShortURL(longUrl, userId) {
  try {
    const id = shortID.generate(); // Generate the short URL ID
    console.log(" shortId:: ", id);
    // Create the new URL entry using Sequelize
    const newUrl = await Url.create({
      shortId: id,
      redirectUrl: longUrl,
      visitHistory: [], // Assuming you store the visit history as an array
      createdBy: userId,
    });

    // Return the necessary fields for the response
    return {
      shortId: newUrl.shortId,
      redirectUrl: newUrl.redirectUrl,
    };
  } catch (error) {
    console.error("Error creating short URL:", error);
    throw new Error("Could not create short URL.");
  }
}

async function getUrlByShortId(shortId) {
    try {
      const urlData = await Url.findOne({ where: { shortId } }); // Use Sequelize to find the URL
      return urlData;
    } catch (error) {
      throw new Error("Error fetching URL from the database");
    }
  }

module.exports = {
  getUserUrlsByEmail,
  createShortURL,
  getUrlByShortId,
};
