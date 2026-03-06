<template>
	<Head>
		<Title>{{ siteTitle }} | {{ data?.result.home.title }}</Title>
	</Head>
	<main>
		<Blocks :content="data?.result.home.content || []" />
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
			}
		}
	}
});

</script>
