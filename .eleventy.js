require('dotenv').config();
const {documentToHtmlString} = require('@contentful/rich-text-html-renderer');
const { BLOCKS } = require('@contentful/rich-text-types');
const { DateTime } = require("luxon");

const renderAsset = (node, resizeTo) => {
	const fields = node.data ? node.data.target.fields : node;
	return `
	<figure>
		<img src="${fields.file.url + (resizeTo ? '?' + dim + '=' + (resizeTo*2) : '')}" />
		<figcaption>
			<span>${fields.title}</span>
			<span>${fields.description}</span>
		</figcaption>
	</figure>`;
}

module.exports = function(eleventyConfig){
	eleventyConfig.addPassthroughCopy("src/assets/images");
	eleventyConfig.addShortcode(
		'documentToHtmlString',
		function(input) {
			return documentToHtmlString(
				input,
				{
					renderNode : {
						[BLOCKS.EMBEDDED_ASSET]: (node) => { return renderAsset(node); }
					}
				}) });
	eleventyConfig.addShortcode("contentBlock", function(contentBlock) {
		return `
		  <section id="${contentBlock.fields.sectionLink}">
			<div>
			  <h3>${contentBlock.fields.sectionTitle}</h3>
			  ${ documentToHtmlString(contentBlock.fields.content) }
			</div>
		  </section>`;
	  });
	eleventyConfig.addShortcode('figureBlock', renderAsset );

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
  