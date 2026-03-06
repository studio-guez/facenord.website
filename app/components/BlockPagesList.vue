<template>
	<header v-if="props.title" class="section-header">
		<h2 class="h2 purple">{{ props.title }}</h2>
	</header>
	<div class="gallery gallery-card" ref="gallery">
		<button class="gallery-prev" v-html="IconPrev"></button>
		<ul class="gallery-items">
			<li v-for="project in props.projects" class="gallery-item project-card project-card-small">
				<NuxtLink :to="'/' + project.url">
					<div v-if="project.image_cover" class="col project-card-image">
						<img :src="project.image_cover?.url" :alt="project.image_cover?.alt" :style="{objectPosition: project.image_cover?.focus}">
					</div>
					<div class="col project-card-content">
						<header class="project-card-header">
							<ul v-if="project.tags" class="tag-list">
								<li v-for="tag in project.tags" class="tag">{{ tag.title }}</li>
							</ul>
							<h3 class="h3">{{ project.title }}</h3>
							<NuxtLink class="link small" :to="project.url">Découvrir ↪</NuxtLink>
						</header>
						<div class="text small" v-html="project.caption"></div>
					</div>
				</NuxtLink>
			</li>
		</ul>
		<button class="gallery-next" v-html="IconNext"></button>
	</div>
	<footer v-if="props.link" class="section-footer">
		<NuxtLink class="small" :to="props.link.url">{{ props.link.label }} ↪</NuxtLink>
	</footer>
</template>

<script setup lang="ts">
	import type Project from "#shared/cms_api";
	import IconPrev from '~/assets/svg/prev.svg?raw';
	import IconNext from '~/assets/svg/next.svg?raw';

	const props = defineProps<{
		projects: Project[],
		title?: string,
		link?: {
			label: string,
			url: string
		}
	}>();

	const gallery = ref(null);
	useGallery(gallery);
</script>