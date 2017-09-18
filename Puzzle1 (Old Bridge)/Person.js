var person = {

	label: null, // String // label to display
	duration: null, // duration to cross the bridge;
	status: null, // String // check the person is safe on the other side of the bridge

	create: function (label, duration, status) {
		var obj = Object.create(this);
		obj.setLabel(label);
		obj.setDuration(duration);
		obj.setStatus(status);

		return obj;
	},
	getLabel: function () {
		return this.label;
	},
	getDuration: function () {
		return this.duration;
	},
	getStatus: function () {
		return this.status;
	},
	setLabel: function (val) {
		this.label = val;
	},
	setDuration: function (val) {
		this.duration = val;
	},
	setStatus: function (val) {
		this.status = val;
	},

	getOnBridge: function () {
		this.setStatus(positionStatus.onBridge);
	}
};