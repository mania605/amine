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

	setValue(key, value) {
		console.log(key);
		let currentValue = null;
		//현제 css에 적용되어 있는 값을 가져와서 실수로 변환
		currentValue = parseFloat(getComputedStyle(this.selector)[key]);
		const isString = typeof value;
		if (isString === 'string') {
			const parentW = parseInt(getComputedStyle(this.selector.parentElement).width);
			const parentH = parseInt(getComputedStyle(this.selector.parentElement).height);

			const x = ['left', 'right', 'width'];
			const y = ['top', 'bottom', 'height'];
			const errProps = ['margin-left', 'margin-right', 'padding-left', 'padding-right', 'margin-top', 'margin-bottom', 'padding-top', 'padding-bottom'];

			for (let cond of errProps) if (key === cond) return console.error('margin, padding값은 퍼센트 모션처리할 수 없습니다.');
			for (let cond of x) key === cond && (currentValue = (currentValue / parentW) * 100);
			for (let cond of y) key === cond && (currentValue = (currentValue / parentH) * 100);

			value = parseFloat(value);
			console.log('curVal', currentValue, 'tarVal', value);
		}
	}

	/*
		this.option.prop === 'scroll'
			? (this.currentValue = this.selector.scrollY)
			: (this.currentValue = parseFloat(
					getComputedStyle(this.selector)[this.option.prop]
			  ));

		this.isString = typeof this.option.value;
		if (this.isString === 'string') {
			const parentW = parseInt(
				getComputedStyle(this.selector.parentElement).width
			);
			const parentH = parseInt(
				getComputedStyle(this.selector.parentElement).height
			);

			const x = ['left', 'right', 'width'];
			const y = ['top', 'bottom', 'height'];
			const errProps = [
				'margin-left',
				'margin-right',
				'padding-left',
				'padding-right',
				'margin-top',
				'margin-bottom',
				'padding-top',
				'padding-bottom',
			];

			for (let cond of errProps)
				if (this.option.prop === cond)
					return console.error(
						'margin, padding값은 퍼센트 모션처리할 수 없습니다.'
					);

			for (let cond of x)
				this.option.prop === cond &&
					(this.currentValue = (this.currentValue / parentW) * 100);
			for (let cond of y)
				this.option.prop === cond &&
					(this.currentValue = (this.currentValue / parentH) * 100);

			this.option.value = parseFloat(this.option.value);
		}

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
}
