var transport = {

	status: null,
	vessel: null,

	create: function (capacity, status) {
		var obj = Object.create(this);
		obj.status = status;
		obj.vessel = vessel.create(capacity);

		return obj;
	},

	getStatus: function () {
		return this.status;
	},
	getVessel: function () {
		return this.vessel;
	},
	setStatus: function (val) {
		for (var i = 0; i < this.vessel.getCapacity(); i ++) {
			if (this.vessel.objArr[i] != null) {
				this.vessel.objArr[i].setStatus(val);
			}
		}
		this.status = val;
	},
	setVessel: function (val) {
		this.vessel = val;
	},

	getMaxDuration: function () { // get max duration
		var objArr = this.getVessel().getObjArr()
		var maxDuration = 0;
		for (var i = 0; i < objArr.length; i ++) {
			if (objArr[i] != null) {
				if (objArr[i].duration > maxDuration) {
					maxDuration = objArr[i].duration;
				}
			}
		}
		return maxDuration;
	},
	crossBridge: function () { // update status
		var objArr = this.getVessel().getObjArr()
		
		if (this.status == positionStatus.unsafeSide) {
			this.status = positionStatus.safeSide;
			for (obj in objArr) {
				obj.status = positionStatus.safeSide;
			}
		}
		else if (this.status == positionStatus.safeSide) {
			this.status = positionStatus.unsafeSide;
			for (obj in objArr) {
				obj.status = positionStatus.unsafeSide;
			}
		}
		else {
			// this.status == "onBridge" // show alert about not finished crossing;
		}
	}
};