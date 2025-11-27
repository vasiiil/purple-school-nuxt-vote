<template>
	<button class="button">
		<slot />
	</button>
</template>

<script setup lang="ts"></script>

<style scoped>
.button {
	cursor: pointer;

	padding: 10px 45px;

	font-family: var(--font-family);
	font-size: 16px;
	font-weight: 500;

	border-radius: 20px;
	border-width: 1px;
	border-style: solid;
	border-color: var(--color-black);
	background-color: var(--color-black);
	color: var(--color-white);
	&:hover {
		background-color: var(--color-black-soft);
	}
}
</style>
