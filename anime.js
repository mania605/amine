class Anime {
	#defOpt = { duration: 500, callback: null, easeType: 'linear' };
	constructor(selector, props, opt) {
		this.selector = selector;
		this.defOpt = { ...this.#defOpt, ...opt };
		this.keys = Object.keys(props);
		this.values = Object.values(props);
		this.duration = this.defOpt.duration;
		this.callback = this.defOpt.callback;
		this.easeType = this.defOpt.easeType;
		this.startTime = performance.now();
		this.isString = null;
		this.isPercent = null;
		this.isBg = null;
		this.easingProgress = null;
		this.keys.forEach((key, idx) => {
			typeof this.values[idx] === 'string'
				? this.values[idx].includes('%')
					? this.getValue(key, this.values[idx], 'percent')
					: this.getValue(key, this.values[idx], 'color')
				: this.getValue(key, this.values[idx], 'basic');
		});
	}

	getValue(key, value, type) {
		let currentValue = null;
		currentValue = parseFloat(getComputedStyle(this.selector)[key]);
		key === 'scroll' ? (currentValue = this.selector.scrollY) : (currentValue = parseFloat(getComputedStyle(this.selector)[key]));

		if (type === 'percent') {
			const parentW = parseInt(getComputedStyle(this.selector.parentElement).width);
			const parentH = parseInt(getComputedStyle(this.selector.parentElement).height);
			const x = ['left', 'right', 'width'];
			const y = ['top', 'bottom', 'height'];
			if (key.includes('margin') || key.includes('padding')) return console.error('margin, padding값은 퍼센트 모션처리할 수 없습니다.');
			for (let cond of x) key === cond && (currentValue = (currentValue / parentW) * 100);
			for (let cond of y) key === cond && (currentValue = (currentValue / parentH) * 100);
			const percentValue = parseFloat(value);
			percentValue !== currentValue && requestAnimationFrame((time) => this.run(time, key, currentValue, percentValue, type));
		}
		if (type === 'color') {
			currentValue = getComputedStyle(this.selector)[key];
			currentValue = this.colorToArray(currentValue);
			value = this.hexToRgb(value);

			this.isBg = true;
			value !== currentValue && requestAnimationFrame((time) => this.run(time, key, currentValue, value, type));
		}
		if (type === 'basic') {
			value !== currentValue && requestAnimationFrame((time) => this.run(time, key, currentValue, value, type));
		}
	}

	run(time, key, currentValue, value, type) {
		let [progress, result] = this.getProgress(time, currentValue, value);

		this.setValue(key, result, type);
		progress < 1
			? ['percent', 'color', 'basic'].map((el) => type === el && requestAnimationFrame((time) => this.run(time, key, currentValue, value, type)))
			: this.callback && this.callback();
	}

	getProgress(time, currentValue, value) {
		const easingPresets = {
			linear: [0, 0, 1, 1],
			ease1: [0.4, -0.61, 0.54, 1.61],
			ease2: [0, 1.82, 0.94, -0.73],
		};

		let timelast = time - this.startTime;
		let progress = timelast / this.duration;

		currentValue.length ? (this.isBg = true) : (this.isBg = false);

		Object.keys(easingPresets).map((key) => {
			if (this.easeType === key) this.easingProgress = BezierEasing(easingPresets[key][0], easingPresets[key][1], easingPresets[key][2], easingPresets[key][3])(progress);
		});

		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);

		if (this.isBg) {
			const result = currentValue.map((curVal, idx) => curVal + (value[idx] - curVal) * this.easingProgress);
			return [progress, result];
		} else {
			const result = currentValue + (value - currentValue) * this.easingProgress;
			return [progress, result];
		}
	}

	setValue(key, result, type) {
		if (type === 'percent') this.selector.style[key] = result + '%';
		else if (this.isBg) this.selector.style[key] = `rgb(${result[0]},${result[1]},${result[2]})`;
		else if (key === 'opacity') this.selector.style[key] = result;
		else if (key === 'scroll') this.selector.scroll(0, result);
		else this.selector.style[key] = result + 'px';
	}

	colorToArray(strColor) {
		return strColor.match(/\d+/g).map(Number);
	}
	hexToRgb(hexColor) {
		const hex = hexColor.replace('#', '');
		const rgb = hex.length === 3 ? hex.match(/a-f\d/gi) : hex.match(/[a-f\d]{2}/gi);

		return rgb.map((el) => {
			if (el.length === 1) el = el + el;
			return parseInt(el, 16);
		});
	}
}
