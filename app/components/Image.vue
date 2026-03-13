<template>
	<img :class="props.class" :src="image.url" :alt="image.alt" :width="image.width" :height="image.height" :style="{objectPosition: image.focus}" :srcset="image.srcset">
</template>

<script setup lang="ts">
	const props = defineProps(['image', 'class']);
</script>