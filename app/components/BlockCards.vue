<template>
	<header v-if="props.block.content.titre" class="section-header">
		<h2 class="h2 purple">{{ props.block.content.titre }}</h2>
	</header>

	<ul class="card-list grid-background">
		<li v-for="card in props.block.content.cards" class="card" v-if="props.block.content.style == 'light'">
			<p class="small mono" v-html="card.text"></p>
			<p v-if="card.baseline" class="x-small mono">{{ card.baseline }}</p>
		</li>

		<li v-for="card in props.block.content.cards" class="card card-purple" v-if="props.block.content.style == 'color'">
			<p class="mono" v-html="card.text"></p>
			<p v-if="card.baseline" class="x-small mono">{{ card.baseline }}</p>
		</li>
	</ul>
</template>

<script setup lang="ts">
	import type Block from "#shared/cms_api";

	const props = defineProps<{
		block: Block
	}>();
</script>