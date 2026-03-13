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
					<NuxtLink :to="project.url" style="display: contents">
						<div class="project-card-image col">
							<Image :image="project.image_cover"/>
						</div>
						<div class="project-card-content col">
							<header class="project-card-header">
								<ul v-if="project.tags.length" class="tag-list">
									<li v-for="tag in project.tags" class="tag" :class="{ active: activeTags.some(t => t.id == tag.id) }">{{ tag.title }}</li>
								</ul>
								<h3 class="h3">{{ project.title }}</h3>
								<NuxtLink class="link small" :to="'/' + project.url">Découvrir le projet ↪</NuxtLink>
							</header>
							<p class="small" v-html="project.caption"></p>
						</div>
					</NuxtLink>
				</li>
			</div>
		</TransitionGroup>
	</main>
</template>

<script setup lang="ts">
	import { TAG_QUERY, PROJECT_HEADER_QUERY } from "#shared/cms_queries";

	const route = useRoute();
	const router = useRouter();
	const siteTitle = useState<string>('siteTitle');
	const tags = ref([]);
	const queryTags = route.query.tags || [];

	const {data, status} = await useFetch('/api/CMS_KQLRequest', {
		method: "POST",
		body: {
			query: "site",
			select: {
				title: "site.find('projets').title.smartypants",
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
			return { 
				id: t.id, 
				title: t.title, 
				checked: queryTags.includes(t.id) 
			}; 
		}); 
	}, {immediate: true});

	const projects = computed(() => {
		return data.value?.result.projects;
	});

	watch(() => tags.value.filter(tag => tag.checked).map(tag => tag.id),
		(selectedIds) => {
			const currentIds = queryTags;
			const sameSelection =
				currentIds.length === selectedIds.length &&
				currentIds.every((id, index) => id === selectedIds[index]);
			if (sameSelection) return;

			const nextQuery = { ...route.query };
			if (selectedIds.length) {
				nextQuery.tags = selectedIds;
			} else {
				delete nextQuery.tags;
			}

			router.replace({ query: nextQuery });
		}
	);

	const activeTags = computed(() => {
		return tags.value.filter(t => t.checked) || [];
	});

	const filteredProjects = computed(() => {
		if (!activeTags.value?.length) {
			return projects.value;
		} else {
			return projects.value.filter(p => p.tags.some(t => activeTags.value.map(t => t.id).includes(t.id)));
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
