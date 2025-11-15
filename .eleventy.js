const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || "/";
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addWatchTarget("src/assets/css/styles.css");

  const { DateTime } = require("luxon");
  eleventyConfig.addNunjucksFilter("date", (input, format = "yyyy") => {
    const d = input === "now" || !input ? new Date() : new Date(input);
    return DateTime.fromJSDate(d).toFormat(format);
  });
  eleventyConfig.addShortcode("year", () => new Date().getFullYear());

return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk","md","html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    pathPrefix: pathPrefix
  };
};
