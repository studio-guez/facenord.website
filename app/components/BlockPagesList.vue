<template>
<div>titre: {{props.block.content.titre}}</div>
	<div v-for="page in block.resolved_pages" :key="page.id"
	 style="border: 1px solid #aaa; padding: 6px; margin: 6px 0"
	>
	<div>title: {{page.title}}</div>
	<div>slug: {{page.slug}}</div>
	<div>url: {{page.url}}</div>
</div>
</template>

<script setup lang="ts">
	import type Block from "#shared/cms_api";

	const props = defineProps<{
		block: Block
	}>();
</script>