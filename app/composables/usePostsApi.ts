import type { IEditPostBody, IPost } from '~/interfaces/post.interface';

export function usePostsApi() {
	const authStore = useAuthStore();
	const { apiUrl } = useApi();

	async function save(body: IEditPostBody, id?: IPost['id']) {
		if (!authStore.token) {
			return null;
		}

		const method = id ? 'PUT' : 'POST';
		const url = id ? `edit/${id}` : 'create';
		const headers = {
			Authorization: `Bearer ${authStore.token}`,
		};

		try {
			return await $fetch<IPost>(`${apiUrl}/posts/${url}`, {
				method,
				body,
				headers,
			});
		} catch {
			return null;
		}
	}
	async function remove(id: IPost['id']) {
		if (!authStore.token) {
			return false;
		}
		const headers = {
			Authorization: `Bearer ${authStore.token}`,
		};
		try {
			await $fetch<IPost>(`${apiUrl}/posts/${id}`, {
				method: 'DELETE',
				headers,
			});
			return true;
		} catch {
			return false;
		}
	}

	return { save, remove };
}
