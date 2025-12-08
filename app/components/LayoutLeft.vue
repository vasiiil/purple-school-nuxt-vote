<template>
	<div class="layout__block">
		<NuxtLink to="/">
			<Icon
				name="icons:home"
				size="24px"
			/>
		</NuxtLink>
		<NuxtLink to="/auth/login">
			<Icon
				name="icons:exit"
				size="24px"
			/>
		</NuxtLink>
	</div>
</template>

<style scoped>
.layout__block {
	position: fixed;
	left: 0;
	top: 0;

	height: 100vh;
	padding: 42px 28px 45px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	border-right: 1px solid var(--color-gray);

	a {
		text-decoration: none;
		color: var(--color-black);

		&:hover {
			color: var(--color-black-soft);
		}
	}
}
</style>
