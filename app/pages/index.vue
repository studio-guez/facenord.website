<template>
  <main class="v-index"
  >
    <p>{{ status }}</p>

    <h1>
      {{data?.result.home.title}}
      <br>//show_title: {{data?.result.home.show_title}}
    </h1>

    <div v-for="block in data?.result.home.content" :key="block.id"
         style="border: 1px solid #ccc; padding: 10px; margin: 10px 0"
    >
      <div>type: {{block.type}}</div>
      <div>---</div>

      <template v-if="block.type === 'cards'">
        <div>titre: {{block.content.titre}}</div>
        <div>style: {{block.content.style}}</div>

        <div v-for="card in block.content.cards" :key="card.text"
             style="border: 1px solid #ccc; padding: 10px; margin: 10px 0"
        >
          <div>card.text: {{card.text}}</div>
          <div>card.baseline: {{card.baseline}}</div>
        </div>
      </template>

      <template v-else-if="block.type === 'article_heading'">
        <div>titre: {{block.content.titre}}</div>
        <div v-html="block.content.text"></div>
      </template>


    </div>

  </main>
</template>


<script setup lang="ts">

import type {CMS_API_Response} from "#shared/cms_api";

type FetchData = CMS_API_Response & {
  "result": {
    "home": {
      "title": string,
      "slug": string,
      "show_title": "true" | "false",
      "content": [
        {
          "content": {
            "titre": string,
            "text": string
          },
          "id": string,
          "isHidden": boolean,
          "type": "article_heading"
        },
        {
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
        },
        {
          "content": {
            "titre": "",
            "pages_liste": ["page://amoaiuetfz8vk7wi"]
          },
          "id": "94a4a1d7-2c91-48aa-bf47-2781ab1fc947",
          "isHidden": false,
          "type": "pages_list"
        }
      ],
      "image_cover": null
    }
  }
}


const {data, status} = await useFetch<FetchData>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: 'site',
    select: {
      home: {
        query: "site.find('home')",
        select: {
          title: true,
          slug: true,
          show_title: true,
          content: {
            query: 'page.content.content.toBlocks',
          },
          image_cover: {
            query: 'page.photo_equipe.toFiles.first',
            select: {
              alt: "file.alt.value",
              tiny: 'file.resize(50, null, 10)',
              small: 'file.resize(500)',
              reg: 'file.resize(1280)',
              large: 'file.resize(1920)',
              xxl: 'file.resize(2500)',
              focus: 'file.focus'
            }
          },
        }
      },
    }
  }
})

</script>


<style lang="scss" scoped>
.v-index {
}
</style>
