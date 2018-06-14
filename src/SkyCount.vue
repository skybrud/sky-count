<script>
import anime from 'animejs';

function pad(n, width, z = 0) {
	const nStr = String(n);
	return nStr.length >= width ? nStr : new Array(width - nStr.length + 1).join(z) + nStr;
}

export default {
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
</script>

<template src="./SkyCount.html"></template>
