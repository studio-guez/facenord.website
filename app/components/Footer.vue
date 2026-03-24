<template>
	<footer class="site-footer grid-background">
		<div class="site-footer-fixed">
			<address class="text" v-html="props.address"></address>
			<div class="align-right">
				<a class="btn btn-small" :href="`mailto:${props.email}`">{{props.email}}</a>
				<nav v-if="props.links.length" class="site-footer-links">
					<NuxtLink v-for="link in props.links" :to="'/' + link.url">{{link.title}}</NuxtLink>
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
</script>