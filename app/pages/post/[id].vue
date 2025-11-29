<template>
	<div>Post [{{ id }}] Page</div>
</template>

<script setup lang="ts">
const route = useRoute();
const id = ref(route.params.id);
</script>
