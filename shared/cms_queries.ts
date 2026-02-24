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
	title: 'page.title.smartypants',
	url: "page.uri",
	caption: 'page.caption.smartypants',
	image_cover: {
		query: 'page.image_cover.toFile',
		select: IMAGE_QUERY
	},
	tags: {
		query: 'page.tags.split'
	}
}

export const BLOCKS_QUERY = {
	id: true,
	type: true,
	content: true,
	isHidden: true,
	images: {
		query: 'block.content.images.toFiles',
		select: IMAGE_QUERY
	},
	image: {
		query: 'block.content.image.toFile',
		select: IMAGE_QUERY
	},
	pages: {
		query: 'block.content.pages_liste.toPages',
		select: PROJECT_HEADER_QUERY
	}
}