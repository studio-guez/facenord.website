<template>
	<div v-if="project">
		<Head>
			<Title>{{ siteTitle }} | {{ project.title }}</Title>
		</Head>
		<main>
			<header class="page-header">
				<div class="page-header-title">
					<h1 class="h1">{{ project.title }}</h1>
				</div>
				<img :src="project.image_cover.url" :alt="project.image_cover.alt" class="page-header-image" :style="{objectPosition: project.image_cover.focus}">
			</header>
			<section v-if="hasIntro" class="project-intro cols cols-align-start">
				<div class="project-intro-header">
					<div v-if="project.caption" class="col col-text col-with-padding">
						<h2 class="h2 purple">En bref</h2>
						<div class="text" v-html="project.caption"></div>
					</div>
					<div v-if="project.intention"class="col col-text col-with-padding">
						<h2 class="h2 purple">Intentions</h2>
						<div class="text" v-html="project.intention"></div>
					</div>
					<div ref="patternsContainer" class="project-patterns" aria-hidden="true">
						<div
							v-for="pattern in patterns"
							:key="pattern.id"
							:class="['project-pattern', { purple: pattern.isPurple }]"
							:style="{
								bottom: `${pattern.bottomPercent}%`
							}"
							v-html="pattern.svgMarkup"
						></div>
					</div>
				</div>
				<div v-if="project.description"class="col col-text col-with-padding">
					<ul v-if="project.tags.length" class="tag-list">
						<li v-for="tag in project.tags" class="tag">{{ tag.title }}</li>
					</ul>
					<div class="project-meta">
						<div v-if="project.current || project.date">
							<span class="x-small purple">{{ project.blueprint.fields.current.options.find(o => o.value == project.current)?.text }}
							</span>
							<span class="x-small grey"> — {{ project.date }}</span>
							</div>
					</div>
					<div class="text" v-html="project.description"></div>
				</div>
			</section>

			<hr class="divider">

			<div class="blocks">
				<Blocks :content="project.content || []" />
			</div>

			<hr v-if="relatedProjects.length" class="divider">

			<section v-if="relatedProjects.length" class="related">
				<BlockPagesList :projects="relatedProjects" title="Quelques projets similaires" :link="{ label: 'Retour à la page projets', url:'/projets' }"/>
			</section>
		</main>
	</div>
</template>

<script setup lang="ts">
	import { TAG_QUERY, PROJECT_HEADER_QUERY, BLOCKS_QUERY, IMAGE_QUERY } from "#shared/cms_queries";
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

	const route = useRoute();
	const slug: string = route.params.slug;
	const siteTitle = useState<string>('siteTitle');

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

	const {data} = await useFetch('/api/CMS_KQLRequest', {
		method: 'POST',
		body: {
			query: `site.find('projets/${ slug }')`,
			select: {
				blueprint: true,
				id: true,
				title: 'page.title.smartypants',
				url: "page.uri",
				caption: 'page.caption.smartypants',
				intention: 'page.intention.smartypants',
				description: 'page.description.smartypants',
				current: true,
				date: true,
				image_cover: {
					query: 'page.image_cover.toFile',
					select: IMAGE_QUERY
				},
				tags: {
					query: 'page.tags.toPages',
					select: TAG_QUERY
				},
				content: {
					query: 'page.content.content.toResolvedBlocks',
					select: BLOCKS_QUERY
				},
				related: {
					query: `page.siblings(false)`,
					select: PROJECT_HEADER_QUERY
				}
			}
		}
	});

	const project = computed(() => data.value?.result);

	const hasIntro = computed(() => {
		return !!(project.value?.caption || project.value?.intention || project.value?.description);
	});

	const relatedProjects = computed(() => {
		const currentTagIds = new Set(project.value?.tags?.map(t => t.id) || []);
		const siblings = project.value?.related || [];

		if (!currentTagIds.size) return [];

		return siblings.filter(p => p.tags?.some(t => currentTagIds.has(t.id)));
	});

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
		const cols = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cols'));
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
