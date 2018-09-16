import anime from 'animejs';

function pad(n, width, z = 0) {
	const nStr = String(n);
	return nStr.length >= width ? nStr : new Array(width - nStr.length + 1).join(z) + nStr;
}

var script = {
	name: 'SkyCount',
	props: {
		trigger: {
			type: Boolean,
			required: true,
		},
		to: {
			type: String,
			required: true,
		},
		duration: {
			type: Number,
			default: 1000,
		},
		delay: {
			type: Number,
			default: 0,
		},
		ease: {
			type: String,
			default: 'easeInOutSine',
		},
		pad: {
			type: [Boolean, Number, String],
			default: true,
		},
		start: {
			type: Number,
			default: 0,
		},
		keepCounting: {
			type: Object,
		},
	},
	data() {
		return {
			display: {
				number: this.start,
			},
			counter: {
				interval: null,
				active: false,
			},
		};
	},
	computed: {
		toNumber() {
			return Number(this.to.replace(/\D/g, ''));
		},
		charPattern() {
			return this.to
				.replace(/\d/g, 0)
				.split('');
		},
		displayNumber() {
			if (this.pad) {
				return pad(
					this.display.number.toString(),
					this.toNumber.toString().length,
					(typeof (this.pad) !== 'boolean') ? this.pad : 0,
				);
			}
			return this.display.number.toString();
		},
		displayString() {
			const queueOfChars = this.displayNumber.split('');
			return this.charPattern
				.slice() // clone
				.reverse()
				.map((char) => {
					if (char === '0') {
						const nextChar = queueOfChars.pop();
						return (nextChar) || '';
					}
					return char;
				}, [])
				.reverse()
				.join('');
		},
	},
	watch: {
		trigger(value) {
			if (value) {
				this.count();
			}
		},
	},
	mounted() {
		if (this.trigger) {
			this.count();
		}
	},
	methods: {
		count() {
			anime({
				targets: this.display,
				number: this.toNumber,
				duration: this.duration,
				delay: this.delay,
				easing: this.ease,
				round: 1,
				complete: () => {
					this.$emit('end');
					if (this.keepCounting) {
						this.startCounting();
					}
				},
			});
		},
		startCounting() {
			this.counter.active = true;
			this.counter.interval = setInterval(() => {
				this.display.number += Math.ceil(this.keepCounting.add || 1);
			}, this.keepCounting.delay);
		},
	},
};

/* script */
            const __vue_script__ = script;
            
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"sky-count",domProps:{"textContent":_vm._s(_vm.displayString)}})};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "SkyCount.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var SkyCount = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

const defaults = {
	registerComponents: true,
};

function install(Vue, options) {
	if (install.installed === true) {
		return;
	}

	const { registerComponents } = Object.assign({}, defaults, options);

	if (registerComponents) {
		Vue.component(SkyCount.name, SkyCount);
	}
}

export default install;
export { SkyCount };
