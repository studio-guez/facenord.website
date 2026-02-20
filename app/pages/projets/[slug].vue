<template>
	<div v-if="project">
		<Head>
			<Title>{{ siteTitle }} | {{ project.title }}</Title>
		</Head>
		<main>
			<header class="project-header">
				<div class="project-header-title">
					<h1 class="h1">{{ project.title }}</h1>
				</div>
				<img :src="project.image_cover.url" :alt="project.image_cover.alt" class="project-header-image">
			</header>
			<section v-if="hasIntro" class="project-intro cols cols-align-start">
				<div>
					<div v-if="project.caption" class="col col-text col-with-padding">
						<h2 class="h2 purple">En bref</h2>
						<div class="text" v-html="project.caption"></div>
					</div>
					<div v-if="project.intention"class="col col-text col-with-padding">
						<h2 class="h2 purple">Intentions</h2>
						<div class="text" v-html="project.intention"></div>
					</div>
				</div>
				<div v-if="project.description"class="col col-text col-with-padding">
					<ul class="tag-list">
						<li v-for="tag in project.tags" class="tag">{{ tag }}</li>
					</ul>
					<div class="text" v-html="project.description"></div>
				</div>
			</section>

			<hr class="divider">

			<div class="blocks">
				<Blocks :content="project.content || []" />
			</div>

			<hr class="divider">

			<section v-if="relatedProjects.length" class="related">
				<BlockPagesList :projects="relatedProjects" title="Quelques projets similaires" :link="{ label: 'Retour à la page projets', url:'/projets' }"/>
			</section>
		</main>
	</div>
</template>

<script setup lang="ts">
	import type { CMS_API_Response, Project } from "#shared/cms_api";
	import { IMAGE_QUERY, TAG_QUERY, PROJECT_HEADER_QUERY, BLOCKS_QUERY } from "#shared/cms_queries";

	const route = useRoute();
	const slug: string = route.params.slug;
	const siteTitle = useState<string>('siteTitle');

	type FetchData = CMS_API_Response & {
		"result": Project
	};

	type RelatedData = CMS_API_Response & {
		"result": Project[]
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
					select: IMAGE_QUERY
				},
				tags: {
					query: 'page.tags.split',
				},
				content: {
					query: 'page.content.content.toBlocks',
					select: BLOCKS_QUERY
				},
			}
		}
	});

	const project = computed(() => data.value?.result);

	const hasIntro = computed(() => {
		return !!(project.value?.caption || project.value?.intention || project.value?.description);
	});

	// Fetch related projects
	const tagList = computed(() => {
		return project.value?.tags?.map(t => t.id) || [];
	});

	const { data: relatedData } = await useFetch<RelatedData>('/api/CMS_KQLRequest', {
		method: 'POST',
		lazy: true,
		body: {
			query:`site.find('projets/${slug}').siblings(false).filterBy('tags', 'typologie', ',')`,
			select: PROJECT_HEADER_QUERY
		}
	});

	const relatedProjects = computed(() => relatedData.value?.result || []);
</script>