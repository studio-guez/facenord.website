<template>
  <div class="v-app">
    <Header :menu="sortedMenu"/>
    <main>
      <NuxtPage/>
    </main>
    <footer></footer>
  </div>
</template>


<script setup lang="ts">
  import type {CMS_API_Response, MenuItem} from "#shared/cms_api";

  type FetchData = CMS_API_Response & {
    "result": {
      "menuHead": MenuItem[],
      "menuTail": MenuItem[]
    }
  }

  const {data, status} = await useFetch<FetchData>('/api/CMS_KQLRequest', {
    lazy: true,
    method: 'POST',
    body: {
      query: "site",
      select: {
        menuHead: {
          query: "site.find('home', 'projets')",
          select: {
            title: true,
            url: "page.isHomePage ? '/' : page.uri"
          }
        },
        menuTail: {
          query: "site.children.listed.not('home', 'projets', 'tags')",
          select: {
            title: true,
            url: "page.uri"
          }
        }
      }
    }
  });

  const sortedMenu = computed((): MenuItem[] => {
    return [...data.value?.result.menuHead, ...data.value?.result.menuTail];
  });
  
</script>
