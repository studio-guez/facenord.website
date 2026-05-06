<template>
	<footer class="site-footer grid-background">
		<div class="site-footer-fixed">
			<div class="footer-left">
				<address class="footer-address" v-html="props.address"></address>
				<img class="footer-sticker" src="/Vignette_FR_Screen_120x120px_sw_RGB.svg" alt="Vignette Entrerpise Formatrice">
			</div>
			<div class="align-right">
				<a v-if="props.email" class="btn btn-small" :href="`mailto:${props.email}`">{{props.email}}</a>
				<nav v-if="props.links.length" class="site-footer-links">
					<NuxtLink target="_blank" v-for="link in props.links" :to="link.url">{{link.title}}</NuxtLink>
				</nav>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
	const props = defineProps<{
		address?: string,
		email?: string
		links?: array
	}>();

	console.log(props.links);
</script>