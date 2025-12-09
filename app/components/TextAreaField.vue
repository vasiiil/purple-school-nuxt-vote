<template>
	<textarea
		v-model="value"
		class="textarea-field"
		v-bind="elementAttrs"
	/>
</template>

<script setup lang="ts">
import type { TextareaHTMLAttributes } from 'vue';

interface IProps extends /* @vue-ignore */ TextareaHTMLAttributes {
	elementAttrs?: TextareaHTMLAttributes;
}
defineProps<IProps>();
const value = defineModel<string>();
</script>

<style scoped>
.textarea-field {
	width: 100%;
	padding: 8px 12px;
	background: none;
	border: 1px solid var(--color-gray);
	border-radius: 20px;
	color: var(--color-black);

	&::placeholder {
		color: var(--color-black-soft);
	}
}
</style>
