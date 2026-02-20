<template>
	<header class="site-header grid-background">
		<nav class="site-menu">
			<li v-for="item in menu">
				<NuxtLink class="btn uppercase" :class="{ active: item.slug == slug }" :to="item.url == '/' ? '/' : '/' + item.url ">{{ item.title }}</NuxtLink>
			</li>
		</nav>
		<div class="site-logo" v-html="Logo"></div>
	</header>
</template>

<script setup lang="ts">
	import Logo from '~/assets/svg/logo-facenord.svg?raw';
	import type {CMS_API_Response, MenuItem} from "#shared/cms_api";

	const { slug } = usePageMeta();

	const props = defineProps<{
		menu?: MenuItem[]
	}>();

</script>