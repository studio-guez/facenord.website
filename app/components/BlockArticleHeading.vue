<template>
	<section class="section-article-heading cols" :class="props.block.content.text.length > 500 ? 'cols-align-start' : ''">
		<header v-if="props.block.content.titre" class="col col-text col-with-padding">
			<h2 class="h2 purple" v-html="props.block.content.titre"></h2>
		</header>
		<div v-else class="grid-background"></div>
		<div class="col col-text col-with-padding">
			<div class="text" v-html="props.block.content.text"></div>
		</div>
	</section>
</template>

<script setup lang="ts">
	import type Block from "#shared/cms_api";
	
	const props = defineProps<{
		block: Block
	}>();
</script>