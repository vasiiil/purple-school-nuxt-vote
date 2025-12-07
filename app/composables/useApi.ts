export function useApi() {
	const config = useRuntimeConfig();
	const apiUrl = config.public.apiurl;

	return { apiUrl };
}
