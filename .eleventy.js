module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addWatchTarget("src/assets/css/styles.css");

  // Nunjucks date filter + simple year() shortcode
  const { DateTime } = require("luxon");
  eleventyConfig.addNunjucksFilter("date", (input, format = "yyyy") => {
    const d = input === "now" || !input ? new Date() : new Date(input);
    return DateTime.fromJSDate(d).toFormat(format);
  });
  eleventyConfig.addShortcode("year", () => new Date().getFullYear());

  // Path prefix for GitHub Pages (project sites vs root/custom domain)
  const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || "/";

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    pathPrefix: pathPrefix
  };
};

