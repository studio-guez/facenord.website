<template>
	<section v-if="props.block.content.image" class="section-image">
		<figure>
			<div class="image-container">
				<img :src="props.block.content.image[0].url" :alt="props.block.content.image[0].alt" :width="props.block.content.image[0].width" :height="props.block.content.image[0].height">
			</div>
			<figcaption v-if="props.block.content.caption || props.block.content.credits" class="section-caption">
				<div v-if="props.block.content.caption" class="text small" v-html="props.block.content.caption"></div>
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
</script>