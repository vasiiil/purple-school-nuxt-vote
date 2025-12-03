// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	runtimeConfig: {
		token: '',
		public: {
			apiurl: '',
		},
	},
	icon: {
		customCollections: [
			{
				prefix: 'icons',
				dir: './app/assets/icons',
			},
		],
	},
	postcss: {
		plugins: {
			'postcss-nested': {},
		},
	},
	app: {
		pageTransition: {
			name: 'page-transition',
			mode: 'out-in',
		},
		head: {
			link: [
				{
					rel: 'stylesheet',
					href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
				},
			],
		},
	},

	modules: [
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxt/image',
		'@nuxt/scripts',
		'@nuxt/icon',
	],
});
