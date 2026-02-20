<template>
	<div v-if="page">
		<Head>
			<Title>{{ siteTitle }} | {{ page.title }}</Title>
		</Head>
		<main>
			<header v-if="page.show_title" class="page-header">
				<div class="page-header-title">
					<h1 class="h1">{{ page.title }}</h1>
				</div>
				<img v-if="page.image_cover" :src="page.image_cover.url" :alt="page.image_cover.alt" class="page-header-image">
			</header>
			<Blocks :content="page.content || []" />
		</main>
	</div>
</template>

<script setup lang="ts">
	import type CMS_API_Response from "#shared/cms_api";
	import {IMAGE_QUERY, BLOCKS_QUERY } from "#shared/cms_queries";

	const siteTitle = useState<string>('siteTitle');
	const { slug } = usePageMeta();

	const {data, status} = await useFetch<FetchData>('/api/CMS_KQLRequest', {
   	method: 'POST',
    	body: {
			query: `site.find('${ slug.value }')`,
			select: {
				title: true,
				slug: true,
				show_title: 'page.show_title.toBool',
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

	const page = computed(() => data.value?.result);
</script>