const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/app.js');

    // Watch CSS files for changes
    eleventyConfig.setBrowserSyncConfig({
      files: './public/css/**/*.css'
    });

    eleventyConfig.addFilter("postDate", (dateObj) => {
      return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });

    return {
      dir: {
        input: "src",
        output: "public"
      }
    }
  };