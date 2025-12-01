<template>
	<div class="root">
		<div class="post">
			<div class="post__top">
				<div class="post__top-icon">
					<Icon
						name="icons:ps"
						size="24px"
					/>
				</div>
				<div class="post__top-user-name">PurpleSchool</div>
				<div class="post__top-date">{{ post.date }}</div>
			</div>
			<div class="post__body">
				<div class="post__body-title">
					<NuxtLink :to="`/post/${post.id}`">{{ post.title }}</NuxtLink>
				</div>
				<div class="post__body-text">{{ post.text }}</div>
			</div>
			<div class="post__bottom">
				<div class="post__bottom-part">
					<div class="post__bottom-part-icon-text">
						<div class="icon">
							<Icon
								name="icons:like"
								size="18px"
							/>
						</div>
						<div class="text">{{ post.likeCount }}</div>
					</div>

					<div class="post__bottom-part-icon-text">
						<div class="icon">
							<Icon
								name="icons:dislike"
								size="18px"
							/>
						</div>
						<div class="text">{{ post.dislikeCount }}</div>
					</div>
				</div>
				<div class="post__bottom-part">
					<div class="post__bottom-part-icon-text">
						<div class="icon">
							<Icon
								name="icons:trash"
								size="18px"
							/>
						</div>
					</div>
					<div class="post__bottom-part-icon-text">
						<div class="icon">
							<Icon
								name="icons:edit"
								size="18px"
							/>
						</div>
						<div class="text edit">Изменить</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
export interface IPost {
	id: number;
	date: string;
	title: string;
	text: string;
	likeCount: number;
	dislikeCount: number;
}

const { post } = defineProps<{
	post: IPost;
}>();
</script>

<style scoped>
.root {
	padding-bottom: 35px;
	margin-bottom: 35px;

	&:last-child {
		margin-bottom: 25px;
	}
	&:not(:last-child) {
		border-bottom: 1px solid var(--color-gray);
	}

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
			&-title {
				margin-bottom: 8px;

				display: -webkit-box;
				-webkit-line-clamp: 1; /* Limits to 3 lines */
				-webkit-box-orient: vertical;
				overflow: hidden;
				text-overflow: ellipsis; /* Adds ellipsis for truncated text */

				a {
					font-size: 22px;
					font-weight: 400;
					color: var(--color-black);
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

				display: -webkit-box;
				-webkit-line-clamp: 3; /* Limits to 3 lines */
				-webkit-box-orient: vertical;
				overflow: hidden;
				text-overflow: ellipsis; /* Adds ellipsis for truncated text */
			}
		}

		&__bottom {
			display: flex;
			justify-content: space-between;

			&-part {
				display: flex;
				gap: 12px;

				&-icon-text {
					display: flex;
					gap: 6px;

					.text {
						font-size: 14px;
						font-weight: 400;
						color: var(--color-black-soft);

						&.edit {
							cursor: pointer;

							&:hover {
								color: var(--color-black);
							}
						}
					}

					.icon {
						color: var(--color-dark-gray-2);
						cursor: pointer;

						&:hover {
							color: var(--color-dark-gray);
						}
					}
				}
			}
		}
	}
}
</style>
