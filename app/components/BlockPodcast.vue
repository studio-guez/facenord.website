<template>
	<section class="section-podcast">
		<header v-if="props.block.content.titre" class="section-header">
			<h2 class="h2 purple">{{ props.block.content.titre }}</h2>
		</header>

		<div class="section-podcast-content">
			<iframe data-testid="embed-iframe" style="border-radius:12px" :src="embedUrl" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type Block from "#shared/cms_api";

	const props = defineProps<{
		block: Block
	}>();

	const embedUrl = computed(():string => {
		let url = props.block.content.spotify_url.replace('spotify.com/', 'spotify.com/embed/');
		return url + '?utm_source=generator';
	});
</script>