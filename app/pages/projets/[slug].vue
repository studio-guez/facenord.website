<template>
	<Head>
		<Title>{{ siteTitle }} | {{ data?.result.title }}</Title>
	</Head>
	<main>
		<header class="project-header">
			<div class="project-header-title">
				<h1 class="h1">{{ data?.result.title }}</h1>
			</div>
			<img :src="data?.result.image_cover.url" :alt="data?.result.image_cover.alt" class="project-header-image">
		</header>
		<section class="project-intro cols cols-align-start">
			<div>
				<div class="col col-text col-with-padding">
					<h2 class="h2 purple">En bref</h2>
					<p>{{ data?.result.caption }}</p>
				</div>
				<div class="col col-text col-with-padding">
					<h2 class="h2 purple">Intentions</h2>
					<div class="text" v-html="data?.result.intention"></div>
				</div>
			</div>
			<div class="col col-text col-with-padding">
				<ul class="tag-list">
					<li v-for="tag in data?.result.tags" class="tag">{{ tag.title }}</li>
				</ul>
				<div class="text" v-html="data?.result.description"></div>
			</div>
		</section>

		<hr class="divider">

		<div class="blocks">
			<template v-for="block in data?.result.content">
				<template v-if="block.type === 'article_heading'">
					<BlockArticleHeading :block="block" />
				</template>

				<template v-else-if="block.type === 'cards'">
					<BlockCards :block="block" />
				</template>
			</template>
		</div>

		<hr class="divider">
	</main>
</template>

<script setup lang="ts">
	import type { CMS_API_Response, Project } from "#shared/cms_api";

	const route = useRoute();
	const slug: string = route.params.slug;
	const siteTitle = useState<string>('siteTitle');

	type FetchData = CMS_API_Response & {
		"result": Project
	};

	const {data, status} = await useFetch<FetchData>('/api/CMS_KQLRequest', {
		lazy: true,
		method: 'POST',
		body: {
			query: `site.find('projets/${ slug }')`,
			select: {
				id: true,
				title: true,
				url: "page.uri",
				caption: true,
				intention: true,
				description: true,
				image_cover: {
					query: 'page.image_cover.toFile',
					select: {
						id: true,
						alt: true,
						url: true,
						width: true,
						height: true
					}
				},
				tags: {
					query: 'page.tags.toPages',
					select: {
						id: true,
						title: true
					}
				},
				content: {
					query: 'page.content.content.toBlocks',
				},
			}
		}
	});
</script>