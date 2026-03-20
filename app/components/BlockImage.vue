<template>
	<section v-if="props.block.content.image" class="section-image">
		<figure>
			<div class="image-container">
				<Image :image="props.block.content.image[0]" />
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
</script>