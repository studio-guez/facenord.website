<template>
	<template v-for="block in props.content" :key="block.id">
		<template v-if="block.type === 'gallery'">
			<BlockGallery :block="block" />
		</template>

		<template v-else-if="block.type === 'podcast'">
        <BlockPodcast :block="block" />
      </template>

		<template v-else-if="block.type === 'cards'">
			<BlockCards :block="block" />
		</template>

		<template v-else-if="block.type === 'article_heading'">
			<BlockArticleHeading :block="block" />
		</template>

		<template v-else-if="block.type === 'pages_list'">
        <BlockPagesList :block="block" />
      </template>

      <template v-else>
      	<div>type: {{block.type}}</div>
      </template>
	</template>
</template>

<script setup lang="ts">
	import type Block from "#shared/cms_api";

	const props = defineProps<{
		content: Block[]
	}>();
	
</script>