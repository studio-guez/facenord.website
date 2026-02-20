<template>
	<Head>
   	<Title>{{ siteTitle }} | {{ data?.result.title }}</Title>
	</Head>
	<main>
		<header class="projects-header">
			<fieldset class="project-tags">
				<div v-for="tag in tags" class="tag" :key="tag.id">
					<label>
						<input type="checkbox" name="project-tags" v-model="tag.checked">
						{{ tag.title }}
					</label>
				</div>
			</fieldset>
		</header>
		<TransitionGroup tag="ul" name="project-list" class="project-list">
			<div v-for="project in filteredProjects" :key="project.id" class="project-list-item">
				<li class="project-card cols">
					<div class="project-card-image col">
						<img :id="project.image_cover.id" :src="project.image_cover.url" :alt="project.image_cover.alt">
					</div>
					<div class="project-card-content col">
						<header class="project-card-header">
							<ul class="tag-list">
								<li v-for="tag in project.tags" class="tag" :class="{ active: activeTags.includes(tag) }">{{ tag }}</li>
							</ul>
							<h3 class="h3">{{ project.title }}</h3>
							<NuxtLink class="link small" :to="'/' + project.url">Découvrir le projet ↪</NuxtLink>
						</header>
						<p class="small" v-html="project.caption"></p>
					</div>
				</li>
			</div>
		</TransitionGroup>
	</main>
</template>

<script setup lang="ts">
	import type {CMS_API_Response, Tag} from "#shared/cms_api";
	import { IMAGE_QUERY, TAG_QUERY, PROJECT_HEADER_QUERY } from "#shared/cms_queries";

	type FetchData = CMS_API_Response & {
		"result": {
			"title": string,
			"tags": Tag[],
			"projects": ProjectHeader[]
		}
	};

	const siteTitle = useState<string>('siteTitle');

	const tags = ref([]);

	const {data, status} = await useFetch<FetchData>('/api/CMS_KQLRequest', {
		method: "POST",
		body: {
			query: "site",
			select: {
				title: "site.find('projets').title",
				tags: {
					query: "site.find('tags').children",
					select: TAG_QUERY
				},
				projects: {
					query: "site.find('projets').children",
					select: PROJECT_HEADER_QUERY
				}
			}
		}
	});

	watch(data, (newData) => {
		tags.value = data.value?.result.tags.map(t => {
			return {title: t.title, checked: false}
		});
	}, {immediate: true});

	const activeTags = computed(() => {
		return tags.value?.filter(t => t.checked).map(t => t.title) || [];
	});

	const filteredProjects = computed(() => {
		if (!activeTags.value?.length) {
			return data.value?.result.projects;
		} else {
			return data.value?.result.projects.filter(p => p.tags.some(t => activeTags.value.includes(t)));	
		}
	});

</script>

<style scoped>
	.project-list-item {
		display: grid;
		grid-template-rows: 1fr;
		overflow: hidden;
		transition: all 0.4s ease;
	}

	.project-list-item > * {
		min-height: 0;
	}

	.project-list-enter-from,
	.project-list-leave-to {
	  grid-template-rows: 0fr;
	  opacity: 0;
	}
</style>