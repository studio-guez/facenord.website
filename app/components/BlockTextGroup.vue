<template>
	<div class="cols">
		<div class="grid-background"></div>
		<div class="col-group">
			<template v-for="block in props.blocks">
				<template v-if="block.type === 'text'">
					<div class="col col-text col-with-padding">
						<div class="text" v-html="block.content.text"></div>
					</div>
				</template>
				<template v-else-if="block.type === 'image'">
					<figure class="col">
						<Image :image="block.content.image[0]" />
						<figcaption v-if="block.content.caption || block.content.credits" class="section-caption">
							<div v-if="block.content.caption" class="text small" v-html="block.content.caption"></div>
							<div v-if="block.content.credits" class="text x-small mono" v-html="block.content.credits"></div>
						</figcaption>
					</figure>
				</template>
			</template>
		</div>
	</div>
		
</template>

<script setup lang="ts">
	const props = defineProps(['blocks']);
</script>