import SkyCount from './SkyCount.vue';

const defaults = {
	registerComponents: true,
};

export { SkyCount };

export default function install(Vue, options) {
	if (install.installed === true) {
		return;
	}

	const { registerComponents } = Object.assign({}, defaults, options);

	if (registerComponents) {
		Vue.component(SkyCount.name, SkyCount);
	}
};
