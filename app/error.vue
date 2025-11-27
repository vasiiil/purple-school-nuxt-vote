<template>
	<div class="error__wrapper">
		<div class="error__code">{{ error.statusCode }}</div>
		<div
			v-if="error.statusCode === 404"
			class="error__message"
		>
			Страница не найдена, вернитесь на главную страницу
		</div>
		<div
			v-else
			class="error__message"
		>
			{{ error.statusMessage }}
		</div>
		<ActionButton @click="goHome">На главную</ActionButton>
	</div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';
import ActionButton from './components/ActionButton.vue';

const { error } = defineProps<{
	error: NuxtError;
}>();

function goHome() {
	navigateTo('/');
}
</script>

<style scoped>
.error__wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100vh;

	color: var(--color-black-soft);
}
.error__code {
	text-align: center;
	font-size: 120px;
	font-weight: 500;
	line-height: 100%;
	letter-spacing: 0%;
}
.error__message {
	text-align: center;
	font-size: 16px;
	font-weight: 300;
	line-height: 24px;
	margin-bottom: 24px;
	letter-spacing: 0%;
}
</style>
