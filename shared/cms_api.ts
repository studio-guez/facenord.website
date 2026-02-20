export type CMS_API_Response = {
	code: number,
	status: 'ok' | string,
}


type CMS_API_Image = {
	"extension": string,
	"filename": string,
	"height": number,
	"id": string,
	"mime": string,
	"niceSize": string,
	"template": string
	"type": "image",
	"url": string,
	"width": number
}

export type Page = {
  id: string,
  title: string,
  slug: string,
  url: string,
}

export type MenuItem = {
	"title": string,
	"url": string,
	"slug": string
}

export type Tag = {
	"id": string,
	"title": string
}

export type Image = {
	"id": string,
	"alt": string,
	"url": string,
	"width": number,
	"height": number
}

export type ProjectHeader = {
	"id": string,
	"title": string,
	"url": string,
	"caption": string,
	"image_cover": Image,
	"tags": Tag[]
}

export type Project = ProjectHeader & {
	intention: string,
	description: string
}

export type Block = (
	BlockArticleHeading |
	BlockCards |
	BlockPagesList |
	BlockGallery |
	BlockPodcast
)

export type BlockArticleHeading = {
	"content": {
		"titre": string,
		"text": string
	},
	"id": string,
	"isHidden": boolean,
	"type": "article_heading"
}

export type BlockCards = {
	"content": {
		"titre": string,
		"style": "color" | "light",
		"cards": {
			"text": string,
			"baseline": string,
		}[]
	},
	"id": string,
	"isHidden": boolean,
	"type": "cards"
}

export type BlockPagesList = {
	"content": {
		"titre": string,
		"pages_liste": string[]
	},
	"id": string,
	"isHidden": boolean,
	"type": "pages_list",
	"resolved_pages": Page[]
}

export type BlockGallery = {
	"content": {
		"titre": string,
		"images": string[]
	},
	"id": string,
	"isHidden": boolean,
	"type": "pages_list",
	"images": Image[]
}

export type BlockPodcast = {
	"content": {
		"titre": string,
		"spotify_url": string
	},
	"id": string,
	"isHidden": boolean,
	"type": "podcast"
}