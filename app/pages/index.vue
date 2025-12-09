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
		<template
			v-for="(post, index) of postsData?.posts"
			:key="`post-view-${post.id}`"
		>
			<PostView :post="post" />
			<div
				v-if="index !== (postsData?.posts?.length ?? 0) - 1"
				class="divider"
			/>
		</template>

		<PaginationComp
			v-model="page"
			:total-count="postsData?.total ?? 0"
			:page-size="pageSize"
		/>
	</div>
</template>

<script setup lang="ts">
import type { IGetPostsResponse } from '~/interfaces/post.interface';

useSeoMeta({
	title: 'Главная',
	description: 'Главная страница VoteApp приложения',
});

const { apiUrl } = useApi();

const route = useRoute();
const router = useRouter();

const page = ref<number>(parseInt(route.query.page?.toString() ?? '1') || 1);
const sort = ref<'date' | 'rating'>(
	route.query.sort === 'rating' ? 'rating' : 'date'
);
const pageSize = ref<number>(
	parseInt(route.query.page_size?.toString() ?? '10') || 10
);
watchEffect(() => {
	router.replace({ query: { page: page.value, sort: sort.value } });
});
const query = computed(() => ({
	page: route.query.page || 1,
	page_size: route.query.page_size || 10,
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

	.divider {
		border-bottom: 1px solid var(--color-gray);
	}
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
