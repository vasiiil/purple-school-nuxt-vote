<template>
	<nav class="pagination-container">
		<!-- Номера страниц и многоточия -->
		<template
			v-for="(page, index) in pagesToShow"
			:key="`${id}-${index}`"
		>
			<span
				v-if="page === '...'"
				class="pagination-dots"
			>
				{{ page }}
			</span>
			<NuxtLink
				v-else
				:class="{ 'active-page': page === currentPage }"
				@click.stop.prevent="changePage(Number(page))"
			>
				{{ page }}
			</NuxtLink>
			<div
				v-if="index !== pagesToShow.length - 1"
				class="divider"
			/>
		</template>
	</nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Определяем props: totalCount и pageSize заменяют totalPages
const props = defineProps<{
	totalCount: number; // Общее количество элементов
	pageSize: number; // Количество элементов на странице
	maxVisiblePages?: number; // Максимум видимых кнопок страниц (по умолчанию 5)
}>();

const id = useId();
const currentPage = defineModel<number>({ required: true });

// 1. Вычисляем общее количество страниц
const totalPages = computed(() => {
	if (props.totalCount === 0 || props.pageSize === 0) return 0;
	// Используем Math.ceil для округления вверх (последняя страница с остатком)
	return Math.ceil(props.totalCount / props.pageSize);
});

// 2. Вычисляем массив видимых страниц с учетом многоточий
const pagesToShow = computed(() => {
	const maxVisible = props.maxVisiblePages || 5;
	const current = currentPage.value;
	const total = totalPages.value;
	const pages: (number | string)[] = [];

	if (total <= maxVisible) {
		// Если страниц мало, показываем все: [1, 2, 3, 4, 5]
		for (let i = 1; i <= total; i++) {
			pages.push(i);
		}
	} else {
		// Если страниц много, используем логику с многоточиями: [1, ..., 4, 5, 6, ..., 10]
		const startPage = Math.max(2, current - Math.floor(maxVisible / 2) + 1);
		const endPage = Math.min(
			total - 1,
			current + Math.floor(maxVisible / 2) - 1
		);

		// Добавляем первую страницу
		pages.push(1);

		// Добавляем первое многоточие, если нужно
		if (startPage > 2) {
			pages.push('...');
		}

		// Добавляем центральные страницы
		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		// Добавляем второе многоточие, если нужно
		if (endPage < total - 1) {
			pages.push('...');
		}

		// Добавляем последнюю страницу
		pages.push(total);
	}

	return pages;
});

function changePage(page: number) {
	if (page >= 1 && page <= totalPages.value) {
		currentPage.value = page;
	}
}
</script>

<style scoped>
.pagination-container {
	margin-top: 20px;
	display: flex;

	.divider {
		margin: 0 15px;
		border-left: 1px solid var(--color-gray);
	}

	a {
		font-weight: 400;
		font-size: 18px;
		line-height: 100%;
		text-decoration: none;
		color: var(--color-dark-gray-2);

		&:not(.active-page) {
			cursor: pointer;

			&:hover {
				color: var(--color-dark-gray-2);
			}
		}

		&.active-page {
			color: var(--color-black-soft);
		}
	}
}

/* Стили для многоточия */
.pagination-dots {
	padding: 8px 0;
	display: flex;
	align-items: center;
	color: var(--color-dark-gray-2);
	cursor: default;
}
</style>
