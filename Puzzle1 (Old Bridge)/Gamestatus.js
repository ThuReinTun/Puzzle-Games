var gamestatus = {

	gameWon: null,
	gameOngoing: null,
	totalDuration: null,
	usedDuration: null,

	create: function (duration) {
		var obj = Object.create(this);
		obj.setGameWon(false);
		obj.setGameOngoing(true);
		obj.setTotalDuration(duration);
		obj.setUsedDuration(0);

		return obj;
	},

	isGameWon: function () {
		return this.gameWon;
	},
	isGameOngoing: function () {
		return this.gameOngoing;
	},
	getTotalDuration: function () {
		return this.totalDuration;
	},
	getUsedDuration: function () {
		return this.usedDuration;
	},
	setGameWon: function (val) {
		this.gameWon = val;
	},
	setGameOngoing: function (val) {
		this.gameOngoing = val;
	},
	setTotalDuration: function (val) {
		this.totalDuration = val;
	},
	setUsedDuration: function (val) {
		this.usedDuration = val;
	},

	// in this case isFinishedGameObjectives means (all people status are positionStatus.safeSide)
	// private function
	isFinishedGameObjectives: function (people) { // people must be array
		// GUARD OPERATION for people array NEEDED

		for (var i = 0; i < people.length; i ++) {
			if (!(people[i].status == positionStatus.safeSide)) {
				return false;
			}
		}
		return true;
	},
	checkGameWon: function (objArr) { //
		if (this.isFinishedGameObjectives(objArr)) {
			if (this.totalDuration >= 0) {
				this.setGameOngoing(false);
				this.setGameWon(true);
				return this.gameWon; // will return true
			}
		}
		return this.gameWon; // will return false // gameWon is initialized as // false
	},
	checkGameOngoing: function () {
		if (this.totalDuration < 1) {
			this.setGameOngoing(false);
			return this.gameOngoing; // will return false
		}
		return this.gameOngoing // will return true // gameOngoing is initialized as // true
	},
	decreaseTotalDuration: function (duration) {
		this.totalDuration -= duration;
		this.usedDuration += duration;
		
		if (this.totalDuration < 0) {
			this.totalDuration = 0;
		}
	},
	increaseTotalDuration: function (duration) {
		this.totalDuration += duration;
	}
}