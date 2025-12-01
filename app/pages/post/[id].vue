<template>
	<div class="root">
		<div class="content">Post [{{ id }}] Page</div>
		<ActionButton @click="goBack">Назад</ActionButton>
	</div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const id = ref(route.params.id);
function goBack() {
	router.go(-1);
}
</script>

<style scoped>
.content {
	margin-bottom: 20px;
}
</style>
