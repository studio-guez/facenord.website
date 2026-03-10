<template>
	<template v-for="block in props.content" :key="block.id">
		<template v-if="block.type === 'gallery'">
			<BlockGallery :block="block" />
		</template>

		<template v-else-if="block.type === 'text'">
			<BlockText :block="block" />
		</template>

		<template v-else-if="block.type === 'podcast'">
        <BlockPodcast :block="block" />
      </template>

      <template v-else-if="block.type === 'video'">
			<BlockVideo :block="block" />
		</template>

		<template v-else-if="block.type === 'image'">
			<BlockImage :block="block" />
		</template>

		<template v-else-if="block.type === 'cards'">
			<BlockCards :block="block" />
		</template>

		<template v-else-if="block.type === 'article_heading'">
			<BlockArticleHeading :block="block" />
		</template>

		<template v-else-if="block.type === 'pages_list'">
        <BlockPagesList v-if="block.pages.length" :projects="block.pages" :title="block.content.titre" :link="{label: block.content.link_label, url: '/' + block.content.link[0].uri}" />
      </template>

      <template v-else-if="block.type === 'profiles'">
			<BlockProfiles :block="block" />
		</template>

		<template v-else-if="block.type === 'map'">
			<BlockMap :block="block" />
		</template>

      <template v-else-if="block.type === 'divider'">
			<BlockDivider />
		</template>

      <template v-else>
      	<div class="section-header" >TODO: bloc {{block.type}}</div>
      </template>
	</template>
</template>

<script setup lang="ts">
	import type Block from "#shared/cms_api";

	const props = defineProps<{
		content: Block[]
	}>();
	
</script>