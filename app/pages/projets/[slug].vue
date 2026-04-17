<template>
	<div v-if="project">
		<Head>
			<Title>{{ siteTitle }} | {{ project.title }}</Title>
		</Head>
		<main>
			<header class="page-header">
				<div class="page-header-title">
					<h1 class="h1">{{ project.title }}</h1>
				</div>
				<Image :image="project.image_cover" class="page-header-image"/>
			</header>
			<section v-if="hasIntro" class="project-intro cols cols-align-start">
				<div class="project-intro-header">
					<div v-if="project.caption" class="col col-text col-with-padding">
						<h2 class="h2 purple">En bref</h2>
						<div class="text" v-html="project.caption"></div>
					</div>
					<div v-if="project.intention"class="col col-text col-with-padding">
						<h2 class="h2 purple">Intentions</h2>
						<div class="text" v-html="project.intention"></div>
					</div>
					<ProjectPatterns />
				</div>
				<div v-if="project.description"class="col col-text col-with-padding">
					<ul v-if="project.tags.length" class="tag-list">
						<li v-for="tag in project.tags" class="tag">{{ tag.title }}</li>
					</ul>
					<div class="project-meta x-small" v-if="project.current || project.date">
						<span class="grey" v-if="project.date">{{ project.date }}</span>
						<span class="grey" v-if="project.date && project.current"> - </span>
						<span class="purple" v-if="project.current">{{ project.blueprint.fields.current.options.find(o => o.value == project.current)?.text }}
						</span>
					</div>
					<div class="text" v-html="project.description"></div>
				</div>
			</section>

			<div class="blocks">
				<Blocks :content="project.content || []" />
			</div>

			<hr v-if="relatedProjects.length" class="divider">

			<section v-if="relatedProjects.length" class="related">
				<BlockPagesList :projects="relatedProjects" title="Quelques projets similaires" :link="{ label: 'Retour à la page projets', url:'/projets' }"/>
			</section>
		</main>
	</div>
</template>

<script setup lang="ts">
	import { TAG_QUERY, PROJECT_HEADER_QUERY, BLOCKS_QUERY, IMAGE_QUERY } from "#shared/cms_queries";

	const route = useRoute();
	const slug: string = route.params.slug;
	const siteTitle = useState<string>('siteTitle');

	const {data} = await useFetch('/api/CMS_KQLRequest', {
		method: 'POST',
		body: {
			query: `site.find('projets/${ slug }')`,
			select: {
				blueprint: true,
				id: true,
				title: 'page.title.smartypants',
				url: "page.uri",
				caption: 'page.caption.smartypants',
				intention: 'page.intention.smartypants',
				description: 'page.description.smartypants',
				current: true,
				date: true,
				image_cover: {
					query: 'page.image_cover.toFile',
					select: IMAGE_QUERY
				},
				tags: {
					query: 'page.tags.toPages',
					select: TAG_QUERY
				},
				content: {
					query: 'page.content.content.toResolvedBlocks',
					select: BLOCKS_QUERY
				},
				related: {
					query: `page.siblings(false)`,
					select: PROJECT_HEADER_QUERY
				}
			}
		}
	});

	const project = computed(() => data.value?.result);

	const hasIntro = computed(() => {
		return !!(project.value?.caption || project.value?.intention || project.value?.description);
	});

	const relatedProjects = computed(() => {
		const currentTagIds = new Set(project.value?.tags?.map(t => t.id) || []);
		const siblings = project.value?.related || [];

		if (!currentTagIds.size) return [];

		return siblings.filter(p => p.tags?.some(t => currentTagIds.has(t.id)));
	});
</script>
