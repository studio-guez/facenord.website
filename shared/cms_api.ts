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

type MenuItem = {
	"title": string,
	"url": string
}

type Tag = {
	"id": string,
	"title": string
}

type Image = {
	"id": string,
	"alt": string,
	"url": string,
	"width": number,
	"height": number
}

type ProjectHeader = {
	"id": string,
	"title": string,
	"url": string,
	"caption": string,
	"image_cover": Image,
	"tags": Tag[]
}

type Project = ProjectHeader & {
	intention: string,
	description: string
}

type Block = (
	BlockArticleHeading |
	BlockCards |
	BlockPagesList
)

type BlockArticleHeading = {
	"content": {
		"titre": string,
		"text": string
	},
	"id": string,
	"isHidden": boolean,
	"type": "article_heading"
}

type BlockCards = {
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

type BlockPagesList = {
	"content": {
		"titre": string,
		"pages_liste": string[]
	},
	"id": string,
	"isHidden": boolean,
	"type": "pages_list"
}