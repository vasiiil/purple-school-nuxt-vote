<template>
	<div class="root">
		<div class="root">
			<PostView
				v-if="post"
				:post="post"
				full
			/>
		</div>
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
</script>

<style scoped></style>
