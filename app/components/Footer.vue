<template>
	<footer class="site-footer grid-background">
		<div class="site-footer-fixed">
			<address class="text" v-html="props.address"></address>
			<nav v-if="props.links.length" class="site-footer-links">
				<NuxtLink class="btn btn-small" v-for="link in props.links" :to="'/' + link.url">{{link.title}}</NuxtLink>
			</nav>
		</div>
	</footer>
</template>

<script setup lang="ts">
	const props = defineProps<{
		address?: string,
		links?: array
	}>();
</script>