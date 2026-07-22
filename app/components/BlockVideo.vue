<template>
	<section v-if="props.block.content.titre || embedUrl" class="section-video">
		<header v-if="props.block.content.titre" class="section-header">
			<h2 class="h2 purple" v-html="props.block.content.titre"></h2>
		</header>

		<figure>
			<div v-if="embed" class="video-container">
				<iframe 
					v-if="embed.provider !== 'file'"
					width="560" height="315" 
					:src="embed.src" 
					title="Video player" 
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
					referrerpolicy="strict-origin-when-cross-origin" 
					allowfullscreen>
				</iframe>
				<video
					v-else
					:src="embed.src"
					controls
					playsinline
					preload="metadata"
				></video>

			</div>

			<figcaption v-if="props.block.content.caption || props.block.content.credits" class="section-caption small">
				<div v-if="props.block.content.caption" class="text" v-html="props.block.content.caption"></div>
				<div v-if="props.block.content.credits" class="text x-small mono" v-html="props.block.content.credits"></div>
			</figcaption>
		</figure>
	</section>
</template>

<script setup lang="ts">
	import type Block from "#shared/cms_api";

	const props = defineProps<{
		block: Block
	}>();

	const embed = computed(() => props.block.content.url ?? null);
</script>