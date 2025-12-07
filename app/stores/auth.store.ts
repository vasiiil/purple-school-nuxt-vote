import type { ILoginResponse } from '~/interfaces/auth.interface';
import type { IUser } from '~/interfaces/user.interface';

export const useAuthStore = defineStore(
	'auth',
	() => {
		const token = ref<string | undefined>();
		const user = ref<IUser | undefined>();

		function setToken(response: ILoginResponse) {
			token.value = response.token;
			user.value = response.user;
		}

		function resetToken() {
			token.value = undefined;
			user.value = undefined;
		}

		return { token, setToken, resetToken, user };
	},
	{ persist: true }
);
