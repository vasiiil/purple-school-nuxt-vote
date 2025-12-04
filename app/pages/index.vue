<template>
	<div class="root">
		<div class="filter">
			<div class="filter__item">
				<NuxtLink
					:class="{ active: sort === 'date' }"
					@click.stop.prevent="sort = 'date'"
				>
					По дате
				</NuxtLink>
			</div>
			<div class="filter__item">
				<NuxtLink
					:class="{ active: sort === 'rating' }"
					@click.stop.prevent="sort = 'rating'"
				>
					По рейтингу
				</NuxtLink>
			</div>
		</div>
		<PostView
			v-for="post of postsData?.posts"
			:key="`post-view-${post.id}`"
			:post="post"
		/>
	</div>
</template>

<script setup lang="ts">
import type { IGetPostsResponse } from '~/interfaces/post.interface';

const config = useRuntimeConfig();
const apiUrl = config.public.apiurl;

const route = useRoute();
const router = useRouter();

const page = ref<number>(parseInt(route.query.page?.toString() ?? '1') || 1);
const sort = ref<'date' | 'rating'>(
	route.query.sort === 'rating' ? 'rating' : 'date'
);
watchEffect(() => {
	router.replace({ query: { page: page.value, sort: sort.value } });
});
const query = computed(() => ({
	page: route.query.page || 1,
	page_size: 10,
	sort: route.query.sort || 'date',
}));
const { data: postsData } = await useFetch<IGetPostsResponse>(
	`${apiUrl}/posts`,
	{
		query,
	}
);
</script>

<style scoped>
.root {
	display: flex;
	flex-direction: column;
	gap: 38px;
}

.filter {
	display: flex;
	gap: 40px;
	padding-bottom: 16px;
	border-bottom: 1px solid var(--color-gray);

	&__item a {
		font-weight: 300;
		font-size: 16px;
		line-height: 100%;
		letter-spacing: 0%;
		color: var(--color-dark-gray);
		text-decoration: none;

		&:not(.active) {
			cursor: pointer;

			&:hover {
				color: var(--color-dark-gray-2);
			}
		}

		&.active {
			color: var(--color-black-soft);
		}
	}
}
</style>
