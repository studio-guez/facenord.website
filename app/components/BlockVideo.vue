<template>
	<section class="section-video">
		<header v-if="props.block.content.titre" class="section-header">
			<h2 class="h2 purple">{{ props.block.content.titre }}</h2>
		</header>

		<div class="video-container">
			<iframe width="560" height="315" :src="embedUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type Block from "#shared/cms_api";

	const props = defineProps<{
		block: Block
	}>();

	const getEmbedUrl = (url: string) => {
		const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);

		if (videoId && videoId[1]) {
			return `https://www.youtube.com/embed/${videoId[1]}`;
		}
		return null;
	};

	const embedUrl = computed(() => getEmbedUrl(props.block.content.url));
</script>