<template>
	<section class="section-map">
			<div class="cols cols-align-start">
				<div class="col col-text col-with-padding">
					<div class="h2" v-html="props.block.content.text"></div>
					<button class="btn btn-primary contact-btn">Où nous trouver ?</button>
					<div class="map-arrow" v-html="Arrow"></div>
				</div>
				<div class="col" v-html="embedCode"></div>	
			</div>
	</section>
</template>

<script setup lang="ts">
	import type Block from "#shared/cms_api";
	import Arrow from '~/assets/svg/arrow.svg?raw';

	const props = defineProps<{
		block: Block
	}>();

	const embedCode = computed(():string => {
		let embedString = props.block.content.embed_code;
		embedString = embedString.replace(/width="[^"]*"/, 'width="100%"');
		embedString = embedString.replace(/height="[^"]*"/, 'height="auto"');
		embedString = embedString.replace(/style="([^"]*)"/, (match, styleContent) => {
   		const separator = styleContent.trim().endsWith(';') || styleContent === '' ? '' : '; ';
   		return `style="${styleContent}${separator}aspect-ratio: 4/3;"`;
   	});
		
		return embedString;
	});

</script>

<style scoped>
	.contact-btn {
		margin-right: 2vw;
		margin-top: 1.25rem;
		margin-left: auto;
	}

	.contact-btn:hover {
		background: var(--purple);
		border-color: var(--purple);
		cursor: default;
	}

	.map-arrow {
		position: relative;
		margin-left: auto;
		top: 1rem;
		transform: rotate(30deg);
		width: 7rem;
		margin-bottom: 1rem;
		z-index: 0;
	}

</style>