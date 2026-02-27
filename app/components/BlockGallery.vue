<template>
	<section class="section-gallery">
		<div class="gallery gallery-image" ref="gallery">
			<button class="gallery-prev" v-html="IconPrev"></button>
			<ul class="gallery-items">
				<li v-for="image in props.block.content.images" class="gallery-item">
					<img :src="image.url" :alt="image.alt" :width="image.width" :height="image.height">
				</li>
			</ul>
			<button class="gallery-next" v-html="IconNext"></button>
		</div>
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