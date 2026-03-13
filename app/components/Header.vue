<template>
	<header class="site-header grid-background">
		<button class="site-mobile-menu-toggle" @click="toggleMenu">
			<svg class="icon-menu" width="40" height="40" viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg">
				<line x1="0" y1="6" x2="40" y2="6" vector-effect="non-scaling-stroke"/>
				<line x1="0" y1="20" x2="40" y2="20" vector-effect="non-scaling-stroke"/>
				<line x1="0" y1="34" x2="40" y2="34" vector-effect="non-scaling-stroke"/>
			</svg>
		</button>
		<nav class="site-menu" :class="{open: showMenu}">
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
	const route = useRoute();
	const showMenu = ref(false);

	const props = defineProps<{
		menu?: MenuItem[]
	}>();

	function toggleMenu() {
		showMenu.value = !showMenu.value;
	}

	watch(() => route.fullPath, () => {
		showMenu.value = false;
	});

	watch(showMenu, (isOpen) => {
		if (isOpen) {
		 document.body.style.overflow = 'hidden';
		} else {
		 document.body.style.overflow = '';
		}
	});

	onUnmounted(() => {
		document.body.style.overflow = '';
	});

</script>