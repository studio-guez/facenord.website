<template>
  <div class="site-wrapper grid-background">
    <Header :menu="sortedMenu"/>
    <NuxtPage/>
    <Footer />
  </div>
</template>

<script setup lang="ts">
  import type {CMS_API_Response, MenuItem} from "#shared/cms_api";

  type FetchData = CMS_API_Response & {
    "result": {
      "title": string,
      "menuHead": MenuItem[],
      "menuTail": MenuItem[]
    }
  }

  const siteTitle = useState<string>('siteTitle');

  const {data, status} = await useFetch<FetchData>('/api/CMS_KQLRequest', {
    method: 'POST',
    body: {
      query: "site",
      select: {
        title: true,
        menuHead: {
          query: "site.find('home', 'projets')",
          select: {
            title: true,
            url: "page.isHomePage ? '/' : page.uri",
            slug: 'page.slug'
          }
        },
        menuTail: {
          query: "site.children.listed.not('home', 'projets', 'tags')",
          select: {
            title: true,
            url: "page.uri",
            slug: 'page.slug'
          }
        }
      }
    }
  });

  if (data.value) siteTitle.value = data.value.result.title;

  const sortedMenu = computed((): MenuItem[] => {
    return [...data.value?.result.menuHead, ...data.value?.result.menuTail];
  });
  
</script>
