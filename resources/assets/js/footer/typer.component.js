const rcwTyper = function(text, opts = {}, callback) {

	let base = this;

	if (!text || typeof text !== 'string') {
		return new Error('Typer must be initiated with valid string');
	}

	this.parent = opts.parent ? document.querySelector(opts.parent) : document.body;
	this.element = opts.element ? document.createElement(opts.element) : document.createElement('span');
	this.placement = opts.placement || 'prepend';
	this.delay = opts.delay || 	100;
	this.eventName = opts.eventName || `rcwTyper_${opts.parent}`;

	this.parent.appendChild(this.element);

	this.setType = (times, factor, words) => {
		let el = this.element;
		let eventName = this.eventName;

		let countDown = function (tick, counter, cb) {
			return () => {
				if (--tick >= 0) {
					window.setTimeout(countDown, ++counter + Math.random() * 400);
					let letter = document.createTextNode(words.charAt(words.length - 1 - tick));
					base.element.append(letter);
				}
				else {
					base.element.dispatchEvent(new CustomEvent(base.eventName, { bubbles: true, detail: words }));
				}
			};
		}(times, 0);

		window.setTimeout(countDown, factor);
	}

	this.startTyping = (words = text) => {
		base.setType(words.length, base.delay, words);
	}

	window.addEventListener(this.eventName, callback);
}