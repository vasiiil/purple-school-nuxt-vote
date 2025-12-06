<template>
	<div class="root">
		<div
			class="post"
			:class="{ full }"
		>
			<div class="post__top">
				<div class="post__top-icon">
					<Icon
						name="icons:ps"
						size="24px"
					/>
				</div>
				<div class="post__top-user-name">PurpleSchool</div>
				<div class="post__top-date">{{ diffDaysStr }}</div>
			</div>
			<div
				class="post__body"
				:class="{ full }"
			>
				<div class="post__body-title clamped">
					<NuxtLink
						v-if="!full"
						:to="`/post/${post.id}`"
					>
						{{ post.title }}
					</NuxtLink>
					<template v-else>{{ post.title }}</template>
				</div>
				<div class="post__body-text clamped">
					{{ post.content }}
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry's standard dummy text ever
					since the 1500s, when an unknown printer took a galley of type and
					scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting,
					remaining essentially unchanged. It was popularised in the 1960s with
					the release of Letraset sheets containing Lorem Ipsum passages, and
					more recently with desktop publishing software like Aldus PageMaker
					including versions of Lorem Ipsum.
				</div>
			</div>
			<div class="post__bottom">
				<div class="post__bottom-part">
					<div class="post__bottom-part-item">
						<Icon
							v-if="votesStore.isLike(post.id)"
							name="icons:like-filled"
							size="18px"
						/>
						<button
							v-else
							class="button-icon"
							@click="onLikeClick"
						>
							<Icon
								name="icons:like"
								size="18px"
							/>
						</button>
						<div class="text">{{ post.likes }}</div>
					</div>

					<div class="post__bottom-part-item">
						<Icon
							v-if="votesStore.isDislike(post.id)"
							name="icons:dislike-filled"
							size="18px"
						/>
						<button
							v-else
							class="button-icon"
							@click="onDislikeClick"
						>
							<Icon
								name="icons:dislike"
								size="18px"
							/>
						</button>
						<div class="text">{{ post.dislikes }}</div>
					</div>
				</div>
				<div
					v-if="!full"
					class="post__bottom-part"
				>
					<div class="post__bottom-part-item">
						<button class="button-icon">
							<Icon
								name="icons:trash"
								size="18px"
							/>
						</button>
					</div>
					<div class="post__bottom-part-item">
						<button class="button-icon">
							<Icon
								name="icons:edit"
								size="18px"
							/>
							<div class="text edit">Изменить</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { IPost } from '~/interfaces/post.interface';
import { diff } from '~/utils/date';

const votesStore = useVotesStore();
const props = defineProps<{
	post: IPost;
	full?: boolean;
}>();
const post = ref<IPost>(props.post);
async function onLikeClick() {
	post.value = await votesStore.like(post.value.id);
}
async function onDislikeClick() {
	post.value = await votesStore.dislike(post.value.id);
}
const diffDays = diff(new Date(post.value.published_at));
const diffDaysStr = computed(() => {
	if (diffDays === null) {
		return new Date(post.value.published_at).toLocaleString();
	}
	if (diffDays === 0) {
		return 'сегодня';
	}
	if (diffDays === 1) {
		return 'вчера';
	}
	if (diffDays <= 4) {
		return `${diffDays} дня назад`;
	}
	if (diffDays <= 6) {
		return `${diffDays} дней назад`;
	}
	if (diffDays === 7) {
		return 'неделю назад';
	}

	return new Date(post.value.published_at).toLocaleString();
});
</script>

<style scoped>
.root {
	.post {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 530px;

		&__top {
			display: flex;
			align-items: center;
			font-size: 14px;
			font-weight: 300;

			&-user-name {
				margin-left: 8px;
				color: var(--color-black-soft);
			}

			&-date {
				margin-left: 16px;
				color: var(--color-dark-gray);
			}
		}

		&__body {
			&:not(.full) {
				.clamped {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis; /* Adds ellipsis for truncated text */
				}

				.post__body-title {
					line-clamp: 1;
					-webkit-line-clamp: 1; /* Limits to 1 lines */
				}

				.post__body-text {
					line-clamp: 3;
					-webkit-line-clamp: 3; /* Limits to 3 lines */
				}
			}
			&-title {
				margin-bottom: 8px;

				&,
				a {
					font-size: 22px;
					font-weight: 400;
					color: var(--color-black);
				}

				a {
					text-decoration: none;

					&:hover {
						color: var(--color-black-soft);
					}
				}
			}

			&-text {
				font-size: 16px;
				font-weight: 300;
				line-height: 24px;
				color: var(--color-black-soft);
			}
		}

		&__bottom {
			display: flex;
			justify-content: space-between;

			&-part {
				display: flex;
				gap: 12px;

				&-item {
					display: flex;
					gap: 6px;
					align-items: center;

					.button-icon {
						display: flex;
						align-items: center;
						gap: 6px;

						color: var(--color-dark-gray-2);
						background: none;
						border: none;
						cursor: pointer;

						&:hover {
							color: var(--color-dark-gray);
						}

						.text {
							font-size: 14px;
							font-weight: 400;
							color: var(--color-black-soft);

							&.edit {
								&:hover {
									color: var(--color-black);
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
