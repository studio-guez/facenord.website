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
};
