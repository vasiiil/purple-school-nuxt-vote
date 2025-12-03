<template>
	<div class="root">
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
const { data: postsData } = await useFetch<IGetPostsResponse>(
	`${apiUrl}/posts`,
	{
		query: {
			page: 1,
			page_size: 10,
			sort: 'date',
		},
	}
);
</script>
