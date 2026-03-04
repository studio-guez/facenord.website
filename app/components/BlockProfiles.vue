<template>
	<section class="profiles">
		<header v-if="props.block.content.titre" class="section-header">
			<h2 class="h2 purple">{{ props.block.content.titre }}</h2>
		</header>

		<ul class="project-list cols">
			<li class="project-card cols" v-for="profile in props.block.content.profiles">
				<div class="col project-card-image">
					<img :src="profile.image_cover.url" :alt="profile.image_cover.alt ?? profile.name" :style="{objectPosition: profile.image_cover.focus}">
				</div>
				<div class="col project-card-content">
					<header class="project-card-header">
						<h3 class="h3">{{ profile.name }}</h3>
						<p class="small purple" href="/project-single.php">{{ profile.function }}</p>
					</header>
					<div class="small text" v-html="profile.roles">
					</div>
				</div>
			</li>
		</ul>
		
	</section>
		
</template>

<script setup lang="ts">
	import type Block from "#shared/cms_api";

	const props = defineProps<{
		block: Block
	}>();
</script>