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

type Project = {
  "id": string,
  "title": string,
  "url": string,
  "caption": string,
  "image_cover": Image,
  "tags": Tag[]
}