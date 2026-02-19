<template>
  <Head>
    <Title>{{ siteTitle }} | {{ data?.result.home.title }}</Title>
  </Head>
  <main class="v-index">
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

      <template v-else-if="block.type === 'pages_list'">
        <div>titre: {{block.content.titre}}</div>
        <div v-for="page in resolvedPagesMap.get(block.id)" :key="page.id"
             style="border: 1px solid #aaa; padding: 6px; margin: 6px 0"
        >
          <div>title: {{page.title}}</div>
          <div>slug: {{page.slug}}</div>
          <div>url: {{page.url}}</div>
        </div>
      </template>

    </div>

  </main>
</template>


<script setup lang="ts">

import type {CMS_API_Response} from "#shared/cms_api";

type ResolvedPage = {
  id: string,
  title: string,
  slug: string,
  url: string,
}

type FetchData = CMS_API_Response & {
  "result": {
    "title": string,
    "home": {
      "title": string,
      "slug": string,
      "show_title": "true" | "false",
      "content": (
        {
          "content": {
            "titre": string,
            "text": string
          },
          "id": string,
          "isHidden": boolean,
          "type": "article_heading"
        } |
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
        } |
        {
          "content": {
            "titre": string,
            "pages_liste": string[]
          },
          "id": string,
          "isHidden": boolean,
          "type": "pages_list"
        }
      )[],
      "pages_list_blocks": {
        "id": string,
        "resolved_pages": ResolvedPage[]
      }[],
      "image_cover": null
    }
  }
}

const siteTitle = useState<string>('siteTitle');

const {data, status} = await useFetch<FetchData>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: 'site',
    select: {
      title: true,
      home: {
        query: "site.find('home')",
        select: {
          title: true,
          slug: true,
          show_title: true,
          content: {
            query: 'page.content.content.toBlocks',
          },
          pages_list_blocks: {
            query: "page.content.content.toBlocks.filterBy('type', 'pages_list')",
            select: {
              id: true,
              resolved_pages: {
                query: 'block.content.pages_liste.toPages',
                select: {
                  id: true,
                  title: true,
                  slug: true,
                  url: true,
                }
              }
            }
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
});

if (data.value) siteTitle.value = data.value.result.title;

const resolvedPagesMap: ComputedRef<Map<string, ResolvedPage[]>> = computed(() => {
  const map = new Map<string, ResolvedPage[]>()

  for (const block of data.value?.result.home.pages_list_blocks ?? []) {
    map.set(block.id, block.resolved_pages)
  }
  return map
});

</script>


<style lang="scss" scoped>
.v-index {
}
</style>
