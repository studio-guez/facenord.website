<template>
	<section class="cols">
		<div v-if="props.block.content.titre" class="col col-text col-with-padding">
			<h3 class="h2">{{ props.block.content.titre }}</h3>
		</div>
		<div v-else class="col grid-background"></div>
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