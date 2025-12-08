<template>
	<form class="login-form">
		<div class="login-form__fields">
			<div class="title">Вход на платформу</div>
			<div class="login-form__fields-field">
				<InputField
					v-model="email"
					icon="email"
					:input-attrs="{ placeholder: 'Email' }"
				/>
			</div>
			<div class="login-form__fields-field">
				<InputField
					v-model="password"
					icon="key"
					:input-attrs="{ placeholder: 'Пароль', type: 'password' }"
				/>
			</div>
		</div>
		<div class="login-form__actions">
			<ActionButton @click.stop.prevent="onLoginClick">
				Войти в аккаунт
			</ActionButton>
		</div>
	</form>
</template>

<script setup lang="ts">
import type { ILoginResponse } from '~/interfaces/auth.interface';

const email = ref<string | undefined>();
const password = ref<string | undefined>();

const { apiUrl } = useApi();
const authStore = useAuthStore();
async function onLoginClick() {
	try {
		const data = await $fetch<ILoginResponse>(`${apiUrl}/auth/login`, {
			method: 'POST',
			body: {
				email: email.value,
				password: password.value,
			},
		});
		authStore.setToken(data);
		navigateTo('/');
	} catch (error) {
		alert('Неверные данные');
	}
}
</script>

<style scoped>
.login-form {
	max-width: 300px;
	width: 100%;
	margin: 0 auto;
	margin-top: calc(50vh - 100px);
	display: flex;
	flex-direction: column;
	gap: 27px;

	.title {
		font-weight: 500;
		font-size: 16px;
		align-self: center;
	}

	&__fields {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	&__actions {
		display: flex;
		flex-direction: column;
		gap: 12px;

		a {
			text-decoration: none;
			margin: 0 auto;
			color: var(--color-black);

			&:hover {
				color: var(--color-black-hover);
			}
		}
	}
}
</style>
