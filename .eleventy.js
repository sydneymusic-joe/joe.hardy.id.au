require('dotenv').config();
const {documentToHtmlString} = require('@contentful/rich-text-html-renderer');
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig){
	eleventyConfig.addPassthroughCopy("src/assets/images");
	eleventyConfig.addShortcode('documentToHtmlString', documentToHtmlString);
	eleventyConfig.addShortcode("contentBlock", function(contentBlock) {
		return `
		  <section id="${contentBlock.fields.sectionLink}">
			<div>
			  <h3>${contentBlock.fields.sectionTitle}</h3>
			  ${ documentToHtmlString(contentBlock.fields.content) }
			</div>
		  </section>`;
	  });
	eleventyConfig.addShortcode('figureBlock', function(fields, resizeTo) {
		return `
	<figure>
		<img src="${fields.file.url + (resizeTo ? '?' + dim + '=' + (resizeTo*2) : '')}" class="pt-10" />
		<figcaption>
			<span>${fields.title}</span>
			<span>${fields.description}</span>
		</figcaption>
	</figure>`; } );

	eleventyConfig.addShortcode(
		"blogDateFormatted",
		function (dateObj) { return `${DateTime.fromISO(dateObj, {zone:'Australia/Sydney'}).toFormat("dd LLLL yyyy @ HH:mm")}` }
		);  

	return {
	  dir: {
		input: "src",
		data: "_data",
		includes: "_includes",
		layouts: "_layouts"
	  }
	};
  }
  