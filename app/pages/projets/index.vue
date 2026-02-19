<template>
	<Head>
   	<Title>{{ siteTitle }} | {{ data?.result.title }}</Title>
	</Head>
	<main>
		<header class="projects-header">
			<fieldset class="project-tags">
				<div v-for="tag in data?.result.tags" class="tag">
					<input type="checkbox" name="project-tags" :id="tag.id">
					<label :for="tag.id">{{ tag.title }}</label>
				</div>
			</fieldset>
		</header>
		<ul class="project-list">
			<li v-for="project in data?.result.projects" class="project-card cols">
				<div class="project-card-image col">
					<img :id="project.image_cover.id" :src="project.image_cover.url" :alt="project.image_cover.alt">
				</div>
				<div class="project-card-content col">
					<header class="project-card-header">
						<ul class="tag-list">
							<li v-for="tag in project.tags" class="tag">{{ tag.title }}</li>
						</ul>
						<h3 class="h3">{{ project.title }}</h3>
						<NuxtLink class="link small" :to="'/' + project.url">Découvrir le projet ↪</NuxtLink>
					</header>
					<p class="small">{{ project.caption }}</p>
				</div>
			</li>
		</ul>
	</main>
</template>

<script setup lang="ts">
	import type {CMS_API_Response, Tag} from "#shared/cms_api";

	type FetchData = CMS_API_Response & {
		"result": {
			"title": string,
			"tags": Tag[],
			"projects": ProjectHeader[]
		}
	};

	const siteTitle = useState<string>('siteTitle');

	const {data, status} = useFetch<FetchData>('/api/CMS_KQLRequest', {
		lazy: true,
		method: "POST",
		body: {
			query: "site",
			select: {
				title: "site.find('projets').title",
				tags: {
					query: "site.find('tags').children",
					select: {
						id: true,
						title: true
					}
				},
				projects: {
					query: "site.find('projets').children",
					select: {
						id: true,
						title: true,
						url: "page.uri",
						caption: true,
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
						}
					}
				}
			}
		}
	});

</script>