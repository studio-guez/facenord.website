<template>
	<div ref="patternsContainer" class="project-patterns" aria-hidden="true">
		<div
			v-for="pattern in patterns"
			:key="pattern.id"
			:class="['project-pattern', { purple: pattern.isPurple }]"
			:style="{ bottom: `${pattern.bottomPercent}%` }"
			v-html="pattern.svgMarkup"
		></div>
	</div>
</template>

<script setup lang="ts">
	import pattern01 from "~/assets/svg/pattern01.svg?raw";
	import pattern02 from "~/assets/svg/pattern02.svg?raw";
	import pattern03 from "~/assets/svg/pattern03.svg?raw";
	import pattern04 from "~/assets/svg/pattern04.svg?raw";
	import pattern05 from "~/assets/svg/pattern05.svg?raw";
	import pattern06 from "~/assets/svg/pattern06.svg?raw";
	import pattern07 from "~/assets/svg/pattern07.svg?raw";
	import pattern08 from "~/assets/svg/pattern08.svg?raw";
	import pattern09 from "~/assets/svg/pattern09.svg?raw";
	import pattern10 from "~/assets/svg/pattern10.svg?raw";
	import pattern11 from "~/assets/svg/pattern11.svg?raw";
	import pattern12 from "~/assets/svg/pattern12.svg?raw";
	import pattern13 from "~/assets/svg/pattern13.svg?raw";
	import pattern14 from "~/assets/svg/pattern14.svg?raw";
	import pattern15 from "~/assets/svg/pattern15.svg?raw";

	type PatternItem = {
		id: string;
		svgMarkup: string;
		bottomPercent: number;
		gridOffsetUnits: number;
		isPurple: boolean;
	};

	const patternMarkupList: string[] = [
		pattern01,
		pattern02,
		pattern03,
		pattern04,
		pattern05,
		pattern06,
		pattern07,
		pattern08,
		pattern09,
		pattern10,
		pattern11,
		pattern12,
		pattern13,
		pattern14,
		pattern15
	];

	const patterns = ref<PatternItem[]>([]);
	const patternsContainer = ref<HTMLElement | null>(null);
	let resizeObserver: ResizeObserver | null = null;
	let patternIdSequence = 0;

	function createPattern(existingPatterns: PatternItem[]): PatternItem {
		const count = existingPatterns.length;
		const isPurple = count >= 2 && existingPatterns[count - 1].isPurple === existingPatterns[count - 2].isPurple
			? !existingPatterns[count - 1].isPurple
			: Math.random() < 0.5;

		return {
			id: `pattern-${patternIdSequence += 1}`,
			svgMarkup: patternMarkupList[Math.floor(Math.random() * patternMarkupList.length)],
			bottomPercent: 0,
			gridOffsetUnits: Math.round(-1 + Math.random() * 2),
			isPurple
		};
	}

	function distributePatternsEvenly(items: PatternItem[], containerHeight: number): PatternItem[] {
		const count = items.length;
		const stepPx = containerHeight / count;
		const colsValue = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cols'));
		const cols = colsValue > 0 ? colsValue : 1;
		const gridUnitPx = window.innerWidth / cols;

		return items.map((pattern, index) => {
			const basePx = Math.round((stepPx * index) / gridUnitPx) * gridUnitPx;
			const offsetPx = index === 0 ? 0 : pattern.gridOffsetUnits * gridUnitPx;
			const bottomPx = basePx + offsetPx;

			return {
				...pattern,
				bottomPercent: (bottomPx / containerHeight) * 100
			};
		});
	}

	function recomputePatterns(): void {
		const containerHeight = patternsContainer.value?.clientHeight || 0;
		const containerWidth = patternsContainer.value?.clientWidth || 0;
		const targetCount = Math.round(containerHeight / containerWidth);

		if (!containerHeight || !containerWidth || targetCount <= 0) {
			patterns.value = [];
			return;
		}

		const nextPatterns = patterns.value.slice();

		if (nextPatterns.length > targetCount) {
			nextPatterns.length = targetCount;
		}

		while (nextPatterns.length < targetCount) {
			nextPatterns.push(createPattern(nextPatterns));
		}

		patterns.value = distributePatternsEvenly(nextPatterns, containerHeight);
	}

	onMounted(() => {
		recomputePatterns();
		window.addEventListener('resize', recomputePatterns);
		resizeObserver = new ResizeObserver(() => {
			recomputePatterns();
		});

		if (patternsContainer.value) {
			resizeObserver.observe(patternsContainer.value);
		}
	});

	onBeforeUnmount(() => {
		window.removeEventListener('resize', recomputePatterns);

		if (resizeObserver) {
			resizeObserver.disconnect();
			resizeObserver = null;
		}
	});
</script>
