<template>
  <div class="site-wrapper grid-background">
    <Header :menu="sortedMenu"/>
    <NuxtPage/>
    <Footer :address="data.result?.footer_address" :links="data.result?.footer_links" :email="data.result?.footer_email"/>
  </div>
</template>

<script setup lang="ts">
  const siteTitle = useState<string>('siteTitle');
  const url = useRequestURL()

  useSeoMeta({
    ogImage: '/og-image.png',
    ogUrl: url.href,
    twitterCard: 'summary_large_image'
  });

  const {data, status} = await useFetch('/api/CMS_KQLRequest', {
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
          query: "site.children.listed.not('home', 'projets', 'tags').filterBy('show_in_menu', true)",
          select: {
            title: true,
            url: "page.uri",
            slug: 'page.slug',
          }
        },
        footer_address: true,
        footer_email: true,
        footer_links: {
          query: 'site.footer_links.toStructure',
          select: {
            url: 'structureItem.link.toUrl',
            title: 'structureItem.label'
          }
        },
      }
    }
  });

  if (data.value) siteTitle.value = data.value.result.title;

  const sortedMenu = computed(() => {
    return [...data.value?.result.menuHead, ...data.value?.result.menuTail];
  });
  
</script>
