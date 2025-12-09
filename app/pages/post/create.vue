<template>
	<PostEdit />
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
useSeoMeta({
	title: 'Создание поста',
	description: 'Страница создания поста в VoteApp приложении',
});
</script>
