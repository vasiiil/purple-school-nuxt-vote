<template>
	<div>Post Edit [{{ id }}] Page</div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
const route = useRoute();
const id = ref(route.params.id);
</script>
