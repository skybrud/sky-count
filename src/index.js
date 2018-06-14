import SkyCount from './SkyCount.vue';

const defaults = {
	registerComponents: true,
};

export { SkyCount };

export default {
	install(Vue, options) {
		const { registerComponents } = Object.assign({}, defaults, options);

		if (registerComponents) {
			Vue.component(SkyCount.name, SkyCount);
		}
	},
};
