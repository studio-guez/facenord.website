<template>
	<img :src="image.url" :alt="image.alt" :width="image.width" :height="image.height" :style="{objectPosition: image.focus}">
		
</template>

<script setup lang="ts">
	const props = defineProps(['image']);
</script>