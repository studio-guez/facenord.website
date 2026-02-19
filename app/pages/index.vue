<template>
	<Head>
		<Title>{{ siteTitle }} | {{ data?.result.home.title }}</Title>
	</Head>
	<main class="v-index">
		<p>{{ status }}</p>

		<h1>
			{{data?.result.home.title}}
			<br>//show_title: {{data?.result.home.show_title}}
		</h1>

		<Blocks :content="data?.result.home.content" />

	</main>
</template>


<script setup lang="ts">

import type {CMS_API_Response, Block} from "#shared/cms_api";

type FetchData = CMS_API_Response & {
	"result": {
		"home": {
			"title": string,
			"slug": string,
			"show_title": "true" | "false",
			"content": Block[],
			"pages_list_blocks": {
				"id": string,
				"resolved_pages": ResolvedPage[]
			}[],
			"image_cover": null
		}
	}
}

const siteTitle = useState<string>('siteTitle');

const {data, status} = await useFetch<FetchData>('/api/CMS_KQLRequest', {
	lazy: true,
	method: 'POST',
	body: {
		query: 'site',
		select: {
			home: {
				query: "site.find('home')",
				select: {
					title: true,
					slug: true,
					show_title: true,
					content: {
						query: 'page.content.content.toBlocks',
						select: {
							id: true,
							type: true,
							content: true,
							isHidden: true,
							images: {
								query: 'block.content.images.toFiles',
								select: {
									id: true,
									alt: true,
									url: true,
									width: true,
									height: true
								}
							},
							resolved_pages: {
								query: 'block.content.pages_liste.toPages',
								select: {
									id: true,
									title: true,
									slug: true,
									url: true,
								}
							}
						}
					},
					image_cover: {
						query: 'page.photo_equipe.toFiles.first',
						select: {
							alt: "file.alt.value",
							tiny: 'file.resize(50, null, 10)',
							small: 'file.resize(500)',
							reg: 'file.resize(1280)',
							large: 'file.resize(1920)',
							xxl: 'file.resize(2500)',
							focus: 'file.focus'
						}
					}
				}
			}
		}
	}
});

</script>


<style lang="scss" scoped>
.v-index {
}
</style>
