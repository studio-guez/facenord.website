<template>
	<section v-if="props.block.content.titre" class="section-text cols">
		<div class="col col-text col-with-padding">
			<h3 class="h2" v-html="props.block.content.titre"></h3>
		</div>	
		<div class="col col-text col-with-padding">
			<div class="text" v-html="props.block.content.text"></div>
		</div>
	</section>
		<section v-else class="section-text">
		<div class="text-container">
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