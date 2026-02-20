export const usePageMeta = () => {
	const route = useRoute();

	const slug = computed(() => {
    const param = route.params.slug as string;
    const pathSegments = route.path.split('/').filter(Boolean);
    
    return param || pathSegments[0] || 'home';
  });
	
	return {
		slug
	};
}