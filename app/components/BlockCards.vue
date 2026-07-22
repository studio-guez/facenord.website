<template>
	<section class="section-cards">
		<header v-if="props.block.content.titre" class="section-header">
			<h2 class="h2 purple" v-html="props.block.content.titre"></h2>
		</header>

		<ul v-if="cards.length" class="card-list grid-background">
			<template v-for="(card, i) in cards" :key="card.text">
				<div class="card-container">
					<li class="card" :class="{'card-purple': isColorStyle}" :style="getAngles(seed + i)">
						<NuxtLink v-if="card.tag" :to="`/projets?tags=${card.tag}`">
							<p class="mono" :class="{'small': !isColorStyle}" v-html="card.text"></p>
							<p v-if="card.baseline" class="x-small mono">{{ card.baseline }}</p>
						</NuxtLink>
						<template v-else>
							<p class="mono" :class="{'small': !isColorStyle}" v-html="card.text"></p>
							<p v-if="card.baseline" class="x-small mono">{{ card.baseline }}</p>
						</template>
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
	const seed = useState(`card-shuffle-seed-${props.block.id ?? ''}`, () => Math.floor(Math.random() * 2 ** 32));

	const cards = computed(() => {
		if (!props.block.content.shuffle || props.block.content.shuffle == 'false') return props.block.content.cards;
		return shuffle(props.block.content.cards, seed.value);
	});

	function isEven(i) {
		return i%2 == 0;
	}

	function getAngles(seed) {
		const base = (random(seed) - 0.5) * 30;
		const hover = base - (Math.sign(base) * 8);

		return {
			'--base-angle': `${base}deg`,
			'--hover-angle': `${hover}deg`
		};
	};

	function shuffle(array, seed) {
		const arr = [...array];
		for (let i = arr.length - 1; i > 0; i--) {
			let j = Math.floor(random(seed + i) * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	function random(seed) {
		seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	}

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