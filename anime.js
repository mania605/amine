class Anime {
	constructor(selector, props, duration, callback) {
		this.selector = selector;
		this.keys = Object.keys(props);
		this.values = Object.values(props);
		this.duration = duration;
		this.callback = callback;
		this.startTime = performance.now();
		//props객체어서 key, value값을 배열로 뽑고 인스턴스 객체로 넘긴다음
		//인스턴스 생성시 내부적으로 해당 배열의 값들을 setValue메서드를 반복호출하면서 인수로 전달
		this.keys.forEach((key, idx) => this.setValue(key, this.values[idx]));
	}

	//인수로 전달된 key값에 따라 value, currentValue값을 가공해서 run메서드에 전달하는 메서드
	setValue(key, value) {
		console.log('test');
		let currentValue = null;
		const isString = typeof value;

		//일반적인 속성명일때 currentValue값 처리
		currentValue = parseFloat(getComputedStyle(this.selector)[key]);

		//속성명이 scroll일때 currentValue값 처리
		key === 'scroll' ? (currentValue = this.selector.scrollY) : (currentValue = parseFloat(getComputedStyle(this.selector)[key]));

		//퍼센트일떄 currentValue값 처리
		if (isString === 'string') {
			const parentW = parseInt(getComputedStyle(this.selector.parentElement).width);
			const parentH = parseInt(getComputedStyle(this.selector.parentElement).height);
			const x = ['left', 'right', 'width'];
			const y = ['top', 'bottom', 'height'];
			if (key.includes('margin') || key.includes('padding')) return console.error('margin, padding값은 퍼센트 모션처리할 수 없습니다.');
			for (let cond of x) key === cond && (currentValue = (currentValue / parentW) * 100);
			for (let cond of y) key === cond && (currentValue = (currentValue / parentH) * 100);

			value = parseFloat(value);
		}
		//위의 조건에 따라서  만들어진 값을 run메서드에 전달
		console.log('curVal', currentValue, 'tarVal', value);
		value !== currentValue && requestAnimationFrame((time) => this.run(time, key, currentValue, value));
	}

	run(time, key, currentValue, value) {
		console.log('time:', time, 'key:', key, 'currentValue:', currentValue, 'value:', value);
	}
}

/*
		this.option.value !== this.currentValue &&
			requestAnimationFrame((time) => this.run(time));
		*/
/*
	run(time) {
		let timelast = time - this.startTime;
		let progress = timelast / this.option.duration;

		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);

		progress < 1
			? requestAnimationFrame((time) => this.run(time))
			: this.option.callback && this.option.callback();

		let result =
			this.currentValue + (this.option.value - this.currentValue) * progress;

		if (this.isString === 'string')
			this.selector.style[this.option.prop] = result + '%';
		else if (this.option.prop === 'opacity')
			this.selector.style[this.option.prop] = result;
		else if (this.option.prop === 'scroll') this.selector.scroll(0, result);
		else this.selector.style[this.option.prop] = result + 'px';
	}
	*/
