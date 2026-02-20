<template>
	<Head>
   	<Title>{{ siteTitle }} | {{ data?.result.title }}</Title>
	</Head>
	<main>
		<Blocks :content="data?.result.content || []" />
	</main>
</template>

<script setup lang="ts">
	import type CMS_API_Response from "#shared/cms_api";
	import {IMAGE_QUERY, BLOCKS_QUERY } from "#shared/cms_queries";

	const route = useRoute();
	const slug: string = route.params.slug;
	const siteTitle = useState<string>('siteTitle');

	const {data, status} = await useFetch<FetchData>('/api/CMS_KQLRequest', {
		lazy: true,
   	method: 'POST',
    	body: {
			query: `site.find('${ slug }')`,
			select: {
				title: true,
				slug: true,
				show_title: true,
				content: {
					query: 'page.content.content.toBlocks',
					select: BLOCKS_QUERY
				},
				image_cover: {
					query: 'page.photo_equipe.toFiles.first',
					select: IMAGE_QUERY
				}
			}
		}
	});
</script>