import type { IPost } from '~/interfaces/post.interface';

export const useVotesStore = defineStore(
	'votes',
	() => {
		const { apiUrl } = useApi();

		const votes = ref<Record<number, 'like' | 'dislike'>>({});
		async function like(id: number) {
			votes.value[id] = 'like';
			return await $fetch<IPost>(`${apiUrl}/posts/${id}/like`, {
				method: 'POST',
			});
		}
		async function dislike(id: number) {
			votes.value[id] = 'dislike';
			return await $fetch<IPost>(`${apiUrl}/posts/${id}/dislike`, {
				method: 'POST',
			});
		}
		function isLike(id: number) {
			return votes.value[id] === 'like';
		}
		function isDislike(id: number) {
			return votes.value[id] === 'dislike';
		}

		return {
			votes,
			like,
			dislike,
			isLike,
			isDislike,
		};
	},
	{ persist: true }
);
