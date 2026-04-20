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

	<div v-else>
		<Head>
			<Title>{{ siteTitle }} | Erreur 404</Title>
		</Head>
		<main>
			<header class="page-header">
				<div class="page-header-title">
					<h1 class="h1">Erreur 404</h1>
					<div>La page demandée n'existe pas.</div>
				</div>
			</header>
			<div class="section-footer">
				<div class="small purple">
					<NuxtLink :to="'/'">Retourner à l'accueil ↪</NuxtLink>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
	import {BLOCKS_QUERY, PAGE_HEADER_QUERY } from "#shared/cms_queries";
	import { useRoute, navigateTo } from '#app';

	const siteTitle = useState<string>('siteTitle');
	const { slug } = usePageMeta();
   const route = useRoute();
   const pathSegments = route.params.slug || [];
	const fullPageSlug = pathSegments.join('/');

	const {data, status} = await useFetch('/api/CMS_KQLRequest', {
   	method: 'POST',
    	body: {
			query: `site.find('${ fullPageSlug }')`,
			select: {
				title: 'page.title.smartypants',
				slug: true,
				show_title: 'page.show_title.toBool',
				caption: true,
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

	useSeoMeta({
		ogTitle: `${siteTitle.value} | ${page.value.title}`,
		description: page.value.caption || null,
		ogDescription: page.value.caption || null,
	})
</script>