<template>
	<PostEdit :post />
</template>

<script setup lang="ts">
import type { IPost } from '~/interfaces/post.interface';

definePageMeta({ middleware: 'auth' });
const route = useRoute();
const id = ref(route.params.id);
useSeoMeta({
	title: `Редактирование поста [${id.value}]`,
	description: 'Страница редактирования поста в VoteApp приложении',
});

const { apiUrl } = useApi();
const { data: post } = await useFetch<IPost>(`${apiUrl}/posts/${id.value}`);
</script>
