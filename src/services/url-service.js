const { Url } = require("../models");
const shortID = require("shortid"); 

class UrlService {
  async getUserUrlsByEmail(email) {
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

  async createShortURL(longUrl, userId) {
    try {
      const id = shortID.generate(); 
      console.log(" shortId:: ", id);
      // Create the new URL entry using Sequelize
      const newUrl = await Url.create({
        shortId: id,
        redirectUrl: longUrl,
        visitHistory: "", 
        createdBy: userId,
      });
      return {
        shortId: newUrl.shortId,
        redirectUrl: newUrl.redirectUrl,
      };
    } catch (error) {
      console.error("Error creating short URL:", error);
      throw new Error("Could not create short URL.");
    }
  }

  async getUrlByShortId(shortId) {
    try {
      const urlData = await Url.findOne({ where: { shortId } });
      return urlData;
    } catch (error) {
      throw new Error("Error fetching URL from the database");
    }
  }
}

module.exports = UrlService;
