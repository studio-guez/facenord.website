<template>
	<template v-for="block in blocks" :key="block.id">
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

		<template v-else-if="block.type === 'text-group'">
			<BlockTextGroup :blocks="block.content" />
		</template>

		<template v-else-if="block.type === 'cards'">
			<BlockCards :block="block" />
		</template>

		<template v-else-if="block.type === 'article_heading'">
			<BlockArticleHeading :block="block" />
		</template>

		<template v-else-if="block.type === 'pages_list'">
        <BlockPagesList v-if="block.pages.length" :projects="block.pages" :title="block.content.titre" :link="{label: block.content.link_label, url: block.content.link?.length ? '/' + block.content.link[0].uri : undefined}" />
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
	
	const blocks = computed(() => {
		return props.content.reduce((acc, current) => {
			const lastBlock = acc[acc.length-1];
			if ((current.type == 'text' && !current.content.titre) || (current.type == 'image' && current.content.full_width == 'false')) {
				if (lastBlock && lastBlock.type === 'text-group') {
      			lastBlock.content.push(current);
      		} else {
      			acc.push({
						type: 'text-group',
						content: [current]
					});
      		}				
			} else {
				acc.push(current);
			}

			return acc;
		}, []);
	});
</script>