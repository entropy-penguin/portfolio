module.exports = function(eleventyConfig) {
// Copy static assets directly to output
eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
eleventyConfig.addWatchTarget("src/assets/css/styles.css");


// Date filter + year shortcode (for Nunjucks)
const { DateTime } = require("luxon");
eleventyConfig.addNunjucksFilter("date", (input, format = "yyyy") => {
const d = input === "now" || !input ? new Date() : new Date(input);
return DateTime.fromJSDate(d).toFormat(format);
});
eleventyConfig.addShortcode("year", () => new Date().getFullYear());


// Base settings. Use pathPrefix so absolute asset links work on GitHub Project Pages
// Set ELEVENTY_PATH_PREFIX to "/<REPO_NAME>/" for a project site.
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
pathPrefix
};
};
