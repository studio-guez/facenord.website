export const IMAGE_QUERY = {
	id: true,
	alt: true,
	url: true,
	width: true,
	height: true
};

export const TAG_QUERY = {
	id: true,
	title: true
}

export const PROJECT_HEADER_QUERY = {
	id: true,
	title: true,
	url: "page.uri",
	caption: true,
	image_cover: {
		query: 'page.image_cover.toFile',
		select: IMAGE_QUERY
	},
	tags: {
		query: 'page.tags.toPages',
		select: TAG_QUERY
	}
}