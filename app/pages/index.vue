<template>
	<Head>
		<Title>{{ siteTitle }} | {{ page.home.title }}</Title>
	</Head>
	<main>
		<Blocks :content="page.home.content || []" />
	</main>
</template>


<script setup lang="ts">
import {TAG_QUERY, PROJECT_HEADER_QUERY, BLOCKS_QUERY } from "#shared/cms_queries";

const siteTitle = useState<string>('siteTitle');

const {data, status} = await useFetch('/api/CMS_KQLRequest', {
	method: 'POST',
	body: {
		query: 'site',
		select: {
			home: {
				query: "site.find('home')",
				select: {
					title: 'page.title.smartypants',
					slug: true,
					show_title: true,
					content: {
						query: 'page.content.content.toResolvedBlocks',
						select: BLOCKS_QUERY
					},
					image_cover: 'page.image_cover.toFile'
				}
			},
			seo: {
				query: "site",
				select: {
					seo_description: true
				}
			}
		}
	}
});

const page = computed(() => data.value?.result);

useSeoMeta({
  ogTitle: `${siteTitle.value} | ${page.value.home.title}`,
  description: page.value.seo.seo_description,
  ogDescription: page.value.seo.seo_description,
})

</script>
