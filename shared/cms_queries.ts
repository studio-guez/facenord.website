export const TAG_QUERY = {
	id: true,
	title: true
}

export const IMAGE_QUERY = {
	url: true,
	width: true,
	height: true,
	alt: true,
	focus: true
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
	pages: {
		query: 'block.content.pages_liste.toPages',
		select: PROJECT_HEADER_QUERY
	}
}

export const PAGE_HEADER_QUERY = {
	id: true,
	title: 'page.title.smartypants',
	slug: true,
	url: "page.uri",
	caption: 'page.caption.smartypants',
	image_cover: {
		query: 'page.image_cover.toFile',
		select: IMAGE_QUERY
	}
}