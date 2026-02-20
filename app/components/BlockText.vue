<template>
	<section class="cols">
		<div class="col col-text col-with-padding">
			<h3 class="h2">{{ props.block.content.title }}</h3>
		</div>
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