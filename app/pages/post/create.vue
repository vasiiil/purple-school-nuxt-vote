<template>
	<div>Post Create Page</div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
useHead({ title: 'Создание поста' });
</script>
