<template>
	<div class="root">
		<div class="left">
			<Icon
				name="icons:plus"
				size="34px"
			/>
			<div class="border"></div>
		</div>
		<div class="right">
			<InputField
				v-model="title"
				:element-attrs="{ placeholder: 'Тема...' }"
				class="title"
			/>
			<TextAreaField
				v-model="content"
				class="content"
				:element-attrs="{ placeholder: 'Текст...' }"
			/>
			<ActionButton
				class="save-button"
				@click="onSaveClick"
				>Сохранить</ActionButton
			>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { IPost } from '~/interfaces/post.interface';
import TextAreaField from '../TextAreaField.vue';

const props = defineProps<{
	post?: IPost;
}>();
const title = ref<IPost['title']>(props.post?.title ?? '');
const content = ref<IPost['content']>(props.post?.content ?? '');

const postsApi = usePostsApi();
async function onSaveClick() {
	const response = await postsApi.save(
		{
			title: title.value,
			content: content.value,
		},
		props.post?.id
	);
	if (response) {
		navigateTo(`/post/edit/${response.id}`);
	}
}
</script>

<style scoped>
.root {
	display: flex;
	gap: 8px;

	.border {
		position: absolute;
		top: 74px;
		bottom: 0;
		left: 231px;
		width: 1px;
		background-color: var(--color-gray);
	}

	.right {
		display: flex;
		flex-direction: column;
		gap: 28px;

		.title {
			width: 320px;
		}
		.content {
			min-width: 480px;
			max-width: 480px;
			min-height: 150px;
			max-height: 320px;
		}

		.save-button {
			align-self: flex-end;
		}
	}
}
</style>
