var vessel = {
	capacity: null,
	objArr: null,
	// positionArr: null,

	create: function (capacity) {
		var obj = Object.create(this);
		obj.capacity = capacity;
		obj.objArr = [];

		for (var i = 0; i < capacity; i ++) {
			obj.objArr[i] = null;
		}
		// obj.positionArr = [];

		return obj;
	},
	getCapacity: function () {
		return this.capacity;
	},
	getObjArr: function () {
		return this.objArr;
	},

	isEmptyIndex: function (index) {
		if (this.objArr[index] === null) {
			return true;
		}
		return false;
	},
	isFullCapacity: function () {
		var reservedIndex = 0;
		for (var i = 0; i < this.objArr.length; i ++) {
			if (this.objArr[i] != null) {
				reservedIndex ++;
			}
		}
		if (reservedIndex < this.capacity) {
			return false;
		}
		return true;
	},
	availableSpace: function () {
		var reservedIndex = 0;
		for (var i = 0; i < this.objArr.length; i ++) {
			if (this.objArr[i] != null) {
				reservedIndex ++;
			}
		}
		return this.capacity - reservedIndex;
	},
	insertByIndex: function (index, val) {
		this.objArr[index] = val;
	},
	insert: function (val) {
		if (!this.isFullCapacity()) {
			console.log("Vessel has " + this.availableSpace() + " availabe space.");
			for (var i = 0; i < this.objArr.length; i ++) {
				if (this.objArr[i] == null) {
					console.log("objArr[" + i + "]" + " == " + this.objArr[i] + ". Set value = " + val.label);
					this.insertByIndex(i, val);
					return true;
				}
				else {
					console.log("objArr[" + i + "] == " + this.objArr[i].label + " (not null). Did not set value = " + val.label);
				}
			}
			return false;
		}
		else {
			console.log("Vessel is in full capacity. None available space.")
		}
		return false;
	},
	takeoutByIndex: function (index) {
		var result = this.objArr[index];
		this.objArr[index] = null;

		return result;
	}
}