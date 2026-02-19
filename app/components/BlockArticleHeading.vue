<template>
	<div>titre: {{props.block.content.titre}}</div>
	<div v-html="props.block.content.text"></div>
</template>

<script setup lang="ts">
	import type Block from "#shared/cms_api";
	
	const props = defineProps<{
		block: Block
	}>();
</script>