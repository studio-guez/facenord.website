<template>
	<section class="section-gallery">
		<header v-if="props.block.content.titre" class="section-header">
			<h2 class="h2 purple" v-html="props.block.content.titre"></h2>
		</header>
		<div class="gallery gallery-image" ref="gallery">
			<button class="gallery-prev" v-html="IconPrev"></button>
			<ul class="gallery-items">
				<li v-for="image in props.block.content.images" class="gallery-item">
					<Image :image="image" />
				</li>
			</ul>
			<button class="gallery-next" v-html="IconNext"></button>
		</div>
		<footer v-if="props.block.content.caption || props.block.content.credits" class="section-caption small">
			<div v-if="props.block.content.caption" class="text" v-html="props.block.content.caption"></div>
			<div v-if="props.block.content.credits" class="text x-small mono" v-html="props.block.content.credits"></div>
		</footer>
	</section>
</template>

<script setup lang="ts">
	import IconPrev from '~/assets/svg/prev.svg?raw';
	import IconNext from '~/assets/svg/next.svg?raw';
	import type Block from "#shared/cms_api";

	const props = defineProps<{
		block: Block
	}>();

	const gallery = ref(null);
	useGallery(gallery);
</script>