<template>
	<NuxtLayout>
		<main class="main-content">
			<NuxtPage />
		</main>
	</NuxtLayout>
</template>

<script setup lang="ts">
import '~/assets/styles/main.css';
</script>

<style scoped>
.main-content {
	width: 690px;
	margin-top: 40px;
	margin-left: 215px;
}
.page-transition {
	&-enter-active,
	&-leave-active {
		transition: all 0.2s;
	}
	&-enter-from,
	&-leave-to {
		opacity: 0;
	}
}
</style>
