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
				<img v-if="page.image_cover" :src="page.image_cover.url" :alt="page.image_cover.alt" class="page-header-image" :style="{objectPosition: project.image_cover.focus}">
			</header>
			<Blocks :content="page.content || []" />

			<hr v-if="page.children.length" class="divider">

			<section v-if="page.children.length" class="section-children">
				<BlockPagesList :projects="page.children"/>
			</section>
		</main>
	</div>
</template>

<script setup lang="ts">
	import type CMS_API_Response from "#shared/cms_api";
	import {BLOCKS_QUERY, PAGE_HEADER_QUERY } from "#shared/cms_queries";
	import { useRoute, navigateTo } from '#app';

	const siteTitle = useState<string>('siteTitle');
	const { slug } = usePageMeta();
   const route = useRoute();
   const pathSegments = route.params.slug || [];
	const fullPageSlug = pathSegments.join('/');

	const {data, status} = await useFetch<FetchData>('/api/CMS_KQLRequest', {
   	method: 'POST',
    	body: {
			query: `site.find('${ fullPageSlug }')`,
			select: {
				title: 'page.title.smartypants',
				slug: true,
				show_title: 'page.show_title.toBool',
				content: {
					query: 'page.content.content.toResolvedBlocks',
					select: BLOCKS_QUERY
				},
				image_cover: 'page.image_cover.toFile',
				children: {
					query: 'page.children',
					select: PAGE_HEADER_QUERY
				}
			}
		}
	});

	const page = computed(() => data.value?.result);
</script>