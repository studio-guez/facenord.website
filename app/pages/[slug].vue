<template>
	<Head>
   	<Title>{{ siteTitle }} | {{ data?.result.title }}</Title>
	</Head>
	<p>{{ data?.result.title }}</p>
</template>

<script setup lang="ts">
	import type CMS_API_Response from "#shared/cms_api";

	const route = useRoute();
	const slug: string = route.params.slug;
	const siteTitle = useState<string>('siteTitle');

	const {data, status} = await useFetch<FetchData>('/api/CMS_KQLRequest', {
		lazy: true,
   	method: 'POST',
    	body: {
			query: `site.find('${ slug }')`,
			select: {
				title: true,
			}
		}
	});
</script>