const rcwTyper = function (text, opts = {}, callback) {

	let base = this;

	if (!text || typeof text !== 'string') {
		return new Error('Typer must be initiated with valid string');
	}

	this.parent = opts.parent ? document.querySelector(opts.parent) : document.body;
	this.element = opts.element ? document.createElement(opts.element) : document.createElement('span');
	this.placement = opts.placement || 'prepend';
	this.delay = opts.delay || 100;
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
				} else {
					base.element.dispatchEvent(new CustomEvent(base.eventName, { bubbles: true, detail: words }));
				}
			};
		}(times, 0);

		window.setTimeout(countDown, factor);
	};

	this.startTyping = (words = text) => {
		base.setType(words.length, base.delay, words);
	};

	window.addEventListener(this.eventName, callback);
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGVyLmNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJyY3dUeXBlciIsInRleHQiLCJvcHRzIiwiY2FsbGJhY2siLCJiYXNlIiwiRXJyb3IiLCJwYXJlbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJib2R5IiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJwbGFjZW1lbnQiLCJkZWxheSIsImV2ZW50TmFtZSIsImFwcGVuZENoaWxkIiwic2V0VHlwZSIsInRpbWVzIiwiZmFjdG9yIiwid29yZHMiLCJlbCIsImNvdW50RG93biIsInRpY2siLCJjb3VudGVyIiwiY2IiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwiTWF0aCIsInJhbmRvbSIsImxldHRlciIsImNyZWF0ZVRleHROb2RlIiwiY2hhckF0IiwibGVuZ3RoIiwiYXBwZW5kIiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50IiwiYnViYmxlcyIsImRldGFpbCIsInN0YXJ0VHlwaW5nIiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBQUEsV0FBQSxVQUFBQyxJQUFBLEVBQUFDLE9BQUEsRUFBQSxFQUFBQyxRQUFBLEVBQUE7O0FBRUEsS0FBQUMsT0FBQSxJQUFBOztBQUVBLEtBQUEsQ0FBQUgsSUFBQSxJQUFBLE9BQUFBLElBQUEsS0FBQSxRQUFBLEVBQUE7QUFDQSxTQUFBLElBQUFJLEtBQUEsQ0FBQSwyQ0FBQSxDQUFBO0FBQ0E7O0FBRUEsTUFBQUMsTUFBQSxHQUFBSixLQUFBSSxNQUFBLEdBQUFDLFNBQUFDLGFBQUEsQ0FBQU4sS0FBQUksTUFBQSxDQUFBLEdBQUFDLFNBQUFFLElBQUE7QUFDQSxNQUFBQyxPQUFBLEdBQUFSLEtBQUFRLE9BQUEsR0FBQUgsU0FBQUksYUFBQSxDQUFBVCxLQUFBUSxPQUFBLENBQUEsR0FBQUgsU0FBQUksYUFBQSxDQUFBLE1BQUEsQ0FBQTtBQUNBLE1BQUFDLFNBQUEsR0FBQVYsS0FBQVUsU0FBQSxJQUFBLFNBQUE7QUFDQSxNQUFBQyxLQUFBLEdBQUFYLEtBQUFXLEtBQUEsSUFBQSxHQUFBO0FBQ0EsTUFBQUMsU0FBQSxHQUFBWixLQUFBWSxTQUFBLElBQUEsWUFBQVosS0FBQUksTUFBQSxFQUFBOztBQUVBLE1BQUFBLE1BQUEsQ0FBQVMsV0FBQSxDQUFBLEtBQUFMLE9BQUE7O0FBRUEsTUFBQU0sT0FBQSxHQUFBLENBQUFDLEtBQUEsRUFBQUMsTUFBQSxFQUFBQyxLQUFBLEtBQUE7QUFDQSxNQUFBQyxLQUFBLEtBQUFWLE9BQUE7QUFDQSxNQUFBSSxZQUFBLEtBQUFBLFNBQUE7O0FBRUEsTUFBQU8sWUFBQSxVQUFBQyxJQUFBLEVBQUFDLE9BQUEsRUFBQUMsRUFBQSxFQUFBO0FBQ0EsVUFBQSxNQUFBO0FBQ0EsUUFBQSxFQUFBRixJQUFBLElBQUEsQ0FBQSxFQUFBO0FBQ0FHLFlBQUFDLFVBQUEsQ0FBQUwsU0FBQSxFQUFBLEVBQUFFLE9BQUEsR0FBQUksS0FBQUMsTUFBQSxLQUFBLEdBQUE7QUFDQSxTQUFBQyxTQUFBdEIsU0FBQXVCLGNBQUEsQ0FBQVgsTUFBQVksTUFBQSxDQUFBWixNQUFBYSxNQUFBLEdBQUEsQ0FBQSxHQUFBVixJQUFBLENBQUEsQ0FBQTtBQUNBbEIsVUFBQU0sT0FBQSxDQUFBdUIsTUFBQSxDQUFBSixNQUFBO0FBQ0EsS0FKQSxNQUtBO0FBQ0F6QixVQUFBTSxPQUFBLENBQUF3QixhQUFBLENBQUEsSUFBQUMsV0FBQSxDQUFBL0IsS0FBQVUsU0FBQSxFQUFBLEVBQUFzQixTQUFBLElBQUEsRUFBQUMsUUFBQWxCLEtBQUEsRUFBQSxDQUFBO0FBQ0E7QUFDQSxJQVRBO0FBVUEsR0FYQSxDQVdBRixLQVhBLEVBV0EsQ0FYQSxDQUFBOztBQWFBUSxTQUFBQyxVQUFBLENBQUFMLFNBQUEsRUFBQUgsTUFBQTtBQUNBLEVBbEJBOztBQW9CQSxNQUFBb0IsV0FBQSxHQUFBLENBQUFuQixRQUFBbEIsSUFBQSxLQUFBO0FBQ0FHLE9BQUFZLE9BQUEsQ0FBQUcsTUFBQWEsTUFBQSxFQUFBNUIsS0FBQVMsS0FBQSxFQUFBTSxLQUFBO0FBQ0EsRUFGQTs7QUFJQU0sUUFBQWMsZ0JBQUEsQ0FBQSxLQUFBekIsU0FBQSxFQUFBWCxRQUFBO0FBQ0EsQ0F6Q0EiLCJmaWxlIjoiZm9vdGVyLnJjdy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHJjd1R5cGVyID0gZnVuY3Rpb24odGV4dCwgb3B0cyA9IHt9LCBjYWxsYmFjaykge1xuXG5cdGxldCBiYXNlID0gdGhpcztcblxuXHRpZiAoIXRleHQgfHwgdHlwZW9mIHRleHQgIT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIG5ldyBFcnJvcignVHlwZXIgbXVzdCBiZSBpbml0aWF0ZWQgd2l0aCB2YWxpZCBzdHJpbmcnKTtcblx0fVxuXG5cdHRoaXMucGFyZW50ID0gb3B0cy5wYXJlbnQgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdHMucGFyZW50KSA6IGRvY3VtZW50LmJvZHk7XG5cdHRoaXMuZWxlbWVudCA9IG9wdHMuZWxlbWVudCA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQob3B0cy5lbGVtZW50KSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0dGhpcy5wbGFjZW1lbnQgPSBvcHRzLnBsYWNlbWVudCB8fCAncHJlcGVuZCc7XG5cdHRoaXMuZGVsYXkgPSBvcHRzLmRlbGF5IHx8IFx0MTAwO1xuXHR0aGlzLmV2ZW50TmFtZSA9IG9wdHMuZXZlbnROYW1lIHx8IGByY3dUeXBlcl8ke29wdHMucGFyZW50fWA7XG5cblx0dGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcblxuXHR0aGlzLnNldFR5cGUgPSAodGltZXMsIGZhY3Rvciwgd29yZHMpID0+IHtcblx0XHRsZXQgZWwgPSB0aGlzLmVsZW1lbnQ7XG5cdFx0bGV0IGV2ZW50TmFtZSA9IHRoaXMuZXZlbnROYW1lO1xuXG5cdFx0bGV0IGNvdW50RG93biA9IGZ1bmN0aW9uICh0aWNrLCBjb3VudGVyLCBjYikge1xuXHRcdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFx0aWYgKC0tdGljayA+PSAwKSB7XG5cdFx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoY291bnREb3duLCArK2NvdW50ZXIgKyBNYXRoLnJhbmRvbSgpICogNDAwKTtcblx0XHRcdFx0XHRsZXQgbGV0dGVyID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUod29yZHMuY2hhckF0KHdvcmRzLmxlbmd0aCAtIDEgLSB0aWNrKSk7XG5cdFx0XHRcdFx0YmFzZS5lbGVtZW50LmFwcGVuZChsZXR0ZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGJhc2UuZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChiYXNlLmV2ZW50TmFtZSwgeyBidWJibGVzOiB0cnVlLCBkZXRhaWw6IHdvcmRzIH0pKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9KHRpbWVzLCAwKTtcblxuXHRcdHdpbmRvdy5zZXRUaW1lb3V0KGNvdW50RG93biwgZmFjdG9yKTtcblx0fVxuXG5cdHRoaXMuc3RhcnRUeXBpbmcgPSAod29yZHMgPSB0ZXh0KSA9PiB7XG5cdFx0YmFzZS5zZXRUeXBlKHdvcmRzLmxlbmd0aCwgYmFzZS5kZWxheSwgd29yZHMpO1xuXHR9XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIodGhpcy5ldmVudE5hbWUsIGNhbGxiYWNrKTtcbn0iXX0=
