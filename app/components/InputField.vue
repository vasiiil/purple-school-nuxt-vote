<template>
	<div
		class="input-wrapper"
		:class="{ 'has-icon': !!icon }"
	>
		<Icon
			v-if="!!icon"
			:name="`icons:${icon}`"
			size="24px"
		/>
		<input
			v-model="value"
			class="input-field"
			v-bind="inputAttrs"
		/>
	</div>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

interface IProps extends /* @vue-ignore */ InputHTMLAttributes {
	inputAttrs?: InputHTMLAttributes;
	icon?: string;
}
const { icon } = defineProps<IProps>();
const value = defineModel<string>();
</script>

<style scoped>
.input-wrapper {
	width: 100%;

	&.has-icon {
		position: relative;

		.input-field {
			padding-left: 44px;
		}

		.iconify {
			position: absolute;
			top: 7px;
			left: 14px;
		}
	}

	.input-field {
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
}
</style>
