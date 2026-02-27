<template>
	<Head>
		<Title>{{ siteTitle }} | {{ data?.result.home.title }}</Title>
	</Head>
	<main>
		<Blocks :content="data?.result.home.content || []" />
	</main>
</template>


<script setup lang="ts">
import type {CMS_API_Response, Block} from "#shared/cms_api";
import {IMAGE_QUERY, TAG_QUERY, PROJECT_HEADER_QUERY, BLOCKS_QUERY } from "#shared/cms_queries";

type FetchData = CMS_API_Response & {
	"result": {
		"home": {
			"title": string,
			"slug": string,
			"show_title": "true" | "false",
			"content": Block[],
			"image_cover": null
		}
	}
}

const siteTitle = useState<string>('siteTitle');

const {data, status} = await useFetch<FetchData>('/api/CMS_KQLRequest', {
	method: 'POST',
	body: {
		query: 'site',
		select: {
			home: {
				query: "site.find('home')",
				select: {
					title: 'page.title.smartypants',
					slug: true,
					show_title: true,
					content: {
						query: 'page.content.content.toResolvedBlocks',
						select: BLOCKS_QUERY
					},
					image_cover: {
						query: 'page.photo_equipe.toFiles.first',
						select: IMAGE_QUERY
					}
				}
			}
		}
	}
});

</script>
