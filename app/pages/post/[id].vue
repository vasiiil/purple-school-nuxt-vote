<template>
	<div class="root">
		<PostView
			v-if="post"
			:post="post"
			full
		/>
		<ActionButton @click="goBack">Назад</ActionButton>
	</div>
</template>

<script setup lang="ts">
import type { IPost } from '~/interfaces/post.interface';

const route = useRoute();
const router = useRouter();
const id = ref(route.params.id);
const { apiUrl } = useApi();
const { data: post } = await useFetch<IPost>(`${apiUrl}/posts/${id.value}`);
function goBack() {
	router.go(-1);
}
const contentDescription = computed(() => {
	if (!post.value) {
		return;
	}
	if (post.value.content.length <= 100) {
		return post.value.content;
	}
	return `${post.value.content.substring(0, 97)}...`;
});
useSeoMeta({
	title: `Пост - ${post.value?.title}`,
	description: contentDescription.value,
});
</script>

<style scoped>
.root {
	display: flex;
	flex-direction: column;
	gap: 28px;

	::v-deep(.button) {
		align-self: flex-start;
	}
}
</style>
