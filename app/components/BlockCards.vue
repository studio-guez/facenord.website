<template>
	<section class="section-cards">
		<header v-if="props.block.content.titre" class="section-header">
			<h2 class="h2 purple">{{ props.block.content.titre }}</h2>
		</header>

		<ul v-if="props.block.content.cards.length" class="card-list grid-background">
			<template v-for="(card, i) in props.block.content.cards">
				<div class="card-container">
					<li class="card" :class="{'card-purple': isColorStyle}" :style="getAngles()">
						<p class="mono" :class="{'small': !isColorStyle}" v-html="card.text"></p>
						<p v-if="card.baseline" class="x-small mono">{{ card.baseline }}</p>
					</li>
					<div v-if="i < props.block.content.cards.length-1 && isColorStyle" class="card-arrow" :class="{top: !isEven(i), bottom: isEven(i)}" v-html="Arrow"></div>
				</div>
			</template>
		</ul>
	</section>
</template>

<script setup lang="ts">
	import type Block from "#shared/cms_api";
	import Arrow from '~/assets/svg/arrow.svg?raw';

	const props = defineProps<{
		block: Block
	}>();

	const isColorStyle = props.block?.content.style == 'color';

	function isEven(i) {
		return i%2 == 0;
	}

	function getAngles() {
		const base = (Math.random() - 0.5) * 30;
		const hover = base - (Math.sign(base) * 8);

		return {
			'--base-angle': `${base}deg`,
			'--hover-angle': `${hover}deg`
		};
	};
</script>

<style scoped>
	.card {
		transform: rotate(var(--base-angle));
		transition: transform 0.3s ease-out;

		&:hover {
			transform: rotate(var(--hover-angle)) scale(1.02);
		}
	}
</style>