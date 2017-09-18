$(document).ready(function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight; // canvasYOffset should be #gamehud.height
		// canvasYOffset = 100;

	// initializing
	var game = null,
		professor = null,
		boy = null,
		girl = null,
		janitor = null,

		unsafeSide = null,
		safeSide = null,
		lantern = null; /* important! */

	var bridgeUnsafeSide = null,
		bridgeSafeSide = null;
	
	// var game = gamestatus.create(17),
	// 	professor = person.create("Professor", 10, positionStatus.unsafeSide),
	// 	boy = person.create("Boy", 1, positionStatus.unsafeSide),
	// 	girl = person.create("Girl", 2, positionStatus.unsafeSide),
	// 	janitor = person.create("Janitor", 5, positionStatus.unsafeSide),

	// 	unsafeSide = vessel.create(4),
	// 	safeSide = vessel.create(4),
	// 	lantern = transport.create(2, positionStatus.unsafeSide); /* important! */

	// var bridgeUnsafeSide = $(".bridge").children(".bridge-unsafe-side", ".marker"),
	// 	bridgeSafeSide = $(".bridge").children(".bridge-safe-side", ".marker");

	resetGame();
	updateTimeDisplay();

	function resetGame () {

		game = gamestatus.create(17);
		professor = person.create("Professor", 10, positionStatus.unsafeSide);
		boy = person.create("Boy", 1, positionStatus.unsafeSide);
		girl = person.create("Girl", 2, positionStatus.unsafeSide);
		janitor = person.create("Janitor", 5, positionStatus.unsafeSide);

		unsafeSide = vessel.create(4);
		safeSide = vessel.create(4);
		lantern = transport.create(2, positionStatus.unsafeSide); /* important! */

		bridgeUnsafeSide = $(".bridge").children(".bridge-unsafe-side", ".marker");
		bridgeSafeSide = $(".bridge").children(".bridge-safe-side", ".marker");
		console.log(game);
		// initialize all characters to left side /* important! */
		unsafeSide.insert(professor);
		unsafeSide.insert(girl);
		unsafeSide.insert(janitor);
		unsafeSide.insert(boy);
		console.log("unsafeSide = ");
		console.log(unsafeSide);
		console.log("safeSide = ");
		console.log(safeSide);
		console.log("lantern = ");
		console.log(lantern);


		// view control
		$(".marker").removeClass("person"); // clear data first
		$(".marker").html("");
			// add person class
		$(".marker", $(".unsafe-side")).addClass("person"); /* important! */
			// add html texts /* important! */
		$(".unsafe-side").children('[data-index="0"]').html("Prof.");
		$(".unsafe-side").children('[data-index="1"]').html("Girl");
		$(".unsafe-side").children('[data-index="2"]').html("Janitor");
		$(".unsafe-side").children('[data-index="3"]').html("Boy");

		// view control lantern
		updateLantern();

		updateTimeDisplay();
	}

	function checkGameStatus () {
		if (game.checkGameWon([professor, girl, boy, janitor])) {
			alert("You won. Used duration: " + game.usedDuration + " min");
			resetGame();
		}
		else {
			if (!game.checkGameOngoing()) {
				alert("You lost. Used duration: " + game.usedDuration + " min");
				resetGame();
			}
		}
	}
	function updateTimeDisplay () {
		$("#timeDisplay").html("Old Bridge: " + game.totalDuration + " Minutes Before Death");
	}
	function updateLantern () {
		if (lantern.status === positionStatus.unsafeSide) {
			for (var i = 0; i < bridgeUnsafeSide.length; i ++) {
				$(bridgeSafeSide[i]).css("background", "yellow");
				$(bridgeUnsafeSide[i]).css("background", "orange");
			}
		}
		else if (lantern.status === positionStatus.safeSide) {
			for (var i = 0; i < bridgeSafeSide.length; i ++) {
				$(bridgeUnsafeSide[i]).css("background", "yellow");
				$(bridgeSafeSide[i]).css("background", "orange");
			}
		}
	}

	// Click events /* --- ---- ---- --- */
	/* --- ---- ---- --- */
	/* --- ---- ---- --- */
	/* --- ---- ---- --- */

	$(".btn-reset").on("click", function () {
		resetGame();
	});

	// cross the bridge /* important! */ /* --- ---- ---- --- */
	/* --- ---- ---- --- */ /* --- ---- ---- --- *//* --- ---- ---- --- */
	$(".btn-cross").on("click", function () {
	if (game.checkGameOngoing()) {

		// lantern is on unsafeSide
		// ---- ----- ----- ----- ----- 
		if (lantern.getStatus() === "unsafeSide") {
			for (var i = 0; i < bridgeUnsafeSide.length; i ++) {
				if ($(bridgeUnsafeSide[i]).hasClass("person")) {
					// for (var i = 0; i < bridgeSafeSideLength; i ++) {
						// update modal /* --- ---- ---- --- */
						lantern.setStatus(positionStatus.safeSide);
						console.log("gaing to safe side : game status vvvvvv");
						console.log(professor);
						console.log(boy);
						console.log(janitor);
						console.log(girl);

						// update view /* --- ---- ---- --- */
						var label = $(bridgeUnsafeSide[i]).html();
						$(bridgeUnsafeSide[i]).html("");
						$(bridgeSafeSide[i]).html(label);

						$(bridgeUnsafeSide[i]).removeClass("person");
						$(bridgeSafeSide[i]).addClass("person");
					// }
					// break;
				}
			}
			// update lantern
			updateLantern();

			// decrease time due to crossing the bridge
			game.decreaseTotalDuration(lantern.getMaxDuration());
			// update time display
			updateTimeDisplay();
			// check game status
			checkGameStatus();
		}
		// lantern is on safeSide
		// ---- ----- ----- ----- ----- 
		else {
			for (var i = 0; i < bridgeSafeSide.length; i ++) {
				if ($(bridgeSafeSide[i]).hasClass("person")) {
					// for (var i = 0; i < bridgeUnsafeSideLength; i ++) {
						// update modal /* --- ---- ---- --- */
						lantern.setStatus(positionStatus.unsafeSide);
						console.log("going to unsafe side : game status vvvvvv");
						console.log(professor);
						console.log(boy);
						console.log(janitor);
						console.log(girl);

						// update view /* --- ---- ---- --- */
						var label = $(bridgeSafeSide[i]).html();
						$(bridgeSafeSide[i]).html("");
						$(bridgeUnsafeSide[i]).html(label);

						$(bridgeSafeSide[i]).removeClass("person");
						$(bridgeUnsafeSide[i]).addClass("person");
				}
			}
			// update lantern
			updateLantern();

			// decrease time due to crossing the bridge
			game.decreaseTotalDuration(lantern.getMaxDuration());
			// update time display
			updateTimeDisplay();
			// check game status
			checkGameStatus();
		}
	}
	});

	// Clicked on unsafe side /* --- ---- ---- --- */
	$(".marker", $(".unsafe-side")).on("click", function() {
	if (game.checkGameOngoing()) {
		console.log("unsafe-side marker clicked");
			/* check person in marker.
			if person exists, do something with person.
			if not, do something with selected empty marker. */
			if ($(this).hasClass("person")) {
				console.log("Person exist in this marker");

				var index = $(this).data("index");
				// if selected ObjArr index is not empty, do something with that object in index
				if (!unsafeSide.isEmptyIndex(index)) {
					// lantern on the unsafe side of the bridge
					if (lantern.status === "unsafeSide") {
						// if lantern vessel is not full yet
						if (!lantern.vessel.isFullCapacity()) {
							// take out object value in unsafe side and insert the value into lantern
							lantern.vessel.insert(unsafeSide.takeoutByIndex(index));

							// update view */ /* ---- ---- ---- */
							var childrenLength = $(".bridge").children(".bridge-unsafe-side", ".marker").length,
								children = $(".bridge").children(".bridge-unsafe-side", ".marker");

							for (var i = 0; i < childrenLength; i ++) {
								// children = $(".bridge").children(".bridge-unsafe-side", ".marker");
								// var dataString = '[data-index="' + i + '"]';

								// children[i] == bride-unsafe-side
								// childrean[i] does not has person class // is empty
								if (!$(children[i]).hasClass("person")) {
									// swap html
									var label = $(this).html();
									$(this).html("");
									$(children[i]).html(label);

									//swap class
									$(this).removeClass("person");
									$(children[i]).addClass("person");
									break;
								}
								else {
								}
							}
						}
					}
				}
				else { // do nothing with the object in index
					// do something to show the index is empty
				}
			}
			else {
				console.log("Empty marker");
			}
	}
	});
	// clicked on safe side /* --- ---- ---- --- */
	$(".marker", $(".safe-side")).on("click", function() {
	if (game.checkGameOngoing()) {
		console.log("safe-side marker clicked");
			/* check person in marker.
			if person exists, do something with person.
			if not, do something with selected empty marker. */
			if ($(this).hasClass("person")) {
				console.log("Person exist in this marker");

				var index = $(this).data("index");
				// if selected ObjArr index is not empty, do something with that object in index
				if (!safeSide.isEmptyIndex(index)) {
					// lantern on the safe side of the bridge
					if (lantern.status === "safeSide") {
						// if lantern vessel is not full yet
						if (!lantern.vessel.isFullCapacity()) {
							// take out object value in safe side and insert the value into lantern
							lantern.vessel.insert(safeSide.takeoutByIndex(index));

							// update view */ /* ---- ---- ---- */
							var childrenLength = $(".bridge").children(".bridge-safe-side", ".marker").length,
								children = $(".bridge").children(".bridge-safe-side", ".marker");

							for (var i = 0; i < childrenLength; i ++) {
								// children = $(".bridge").children(".bridge-safe-side", ".marker");
								// var dataString = '[data-index="' + i + '"]';

								// children[i] == bride-safe-side
								// childrean[i] does not has person class // is empty
								if (!$(children[i]).hasClass("person")) {
									// swap html
									var label = $(this).html();
									$(this).html("");
									$(children[i]).html(label);

									//swap class
									$(this).removeClass("person");
									$(children[i]).addClass("person");
									break;
								}
								else {
								}
							}
						}
					}
				}
				else { // do nothing with the object in index
					// do something to show the index is empty
				}
			}
			else {
				console.log("Empty marker");
			}
	}
	});

	// clicked on bridge /* --- ---- ---- --- */
	/* --- ---- ---- --- *//* --- ---- ---- --- */
	$(".marker", $(".bridge")).on("click", function() {
	if (game.checkGameOngoing()) {

		// if clicked on bridge unsafe side 
		/* --- ---- ---- --- *//* --- ---- ---- --- */
		if ($(this).hasClass("bridge-unsafe-side")) {
			console.log("bridge unsafe side marker clicked");
			/* check person in marker.
			if person exists, do something with person.
			if not, do something with selected empty marker. */
			if ($(this).hasClass("person")) {
				console.log("Person exist in this marker");

				var index = $(this).data("index");
				// if selected ObjArr index is not empty, do something with that object in index
				if (!lantern.vessel.isEmptyIndex(index)) { // logically ensures for the clicked obj is not empty
					// lantern on the unsafe side of the bridge
					if (lantern.status === "unsafeSide") {
						// take out object value in lantern and insert the value into unsafe side
						unsafeSide.insert(lantern.vessel.takeoutByIndex(index));

						// update view */ /* ---- ---- ---- */
						 /* ---- ---- ---- */ /* ---- ---- ---- */
						var childrenLength = $(".unsafe-side").children(".marker").length,
							children = $(".unsafe-side").children(".marker");

						for (var i = 0; i < childrenLength; i ++) {
							// children = $(".bridge").children(".bridge-unsafe-side", ".marker");
							// var dataString = '[data-index="' + i + '"]';

							// children[i] == bride-unsafe-side
							// childrean[i] does not has person class // is empty
							if (!$(children[i]).hasClass("person")) {
								// swap html
								var label = $(this).html();
								$(this).html("");
								$(children[i]).html(label);

								//swap class
								$(this).removeClass("person");
								$(children[i]).addClass("person");
								break;
							}
							else {
							}
						}
					}
				}
				else { // do nothing with the object in index
					// do something to show the index is empty
				}
			}
			else {
				console.log("Empty marker");
			}
		}

		// clicked on bridge unsafe side /* --- ---- ---- --- */
		/* --- ---- ---- --- *//* --- ---- ---- --- */
		else {
			console.log("bridge safe side marker clicked");
			/* check person in marker.
			if person exists, do something with person.
			if not, do something with selected empty marker. */
			if ($(this).hasClass("person")) {
				console.log("Person exist in this marker");

				var index = $(this).data("index");
				// if selected ObjArr index is not empty, do something with that object in index
				if (!lantern.vessel.isEmptyIndex(index)) { // logically ensures for the clicked obj is not empty
					// lantern on the safe side of the bridge
					if (lantern.status === "safeSide") {
						// take out object value in lantern and insert the value into safe side
						safeSide.insert(lantern.vessel.takeoutByIndex(index));

						// update view */ /* ---- ---- ---- */
						 /* ---- ---- ---- */ /* ---- ---- ---- */
						var childrenLength = $(".safe-side").children(".marker").length,
							children = $(".safe-side").children(".marker");

						for (var i = 0; i < childrenLength; i ++) {
							// children = $(".bridge").children(".bridge-safe-side", ".marker");
							// var dataString = '[data-index="' + i + '"]';

							// children[i] == bride-safe-side
							// childrean[i] does not has person class // is empty
							if (!$(children[i]).hasClass("person")) {
								// swap html
								var label = $(this).html();
								$(this).html("");
								$(children[i]).html(label);

								//swap class
								$(this).removeClass("person");
								$(children[i]).addClass("person");
								break;
							}
							else {
							}
						}
					}
				}
				else { // do nothing with the object in index
					// do something to show the index is empty
				}
			}
			else {
				console.log("Empty marker");
			}
		}
	}
	});
	
});

/* // //  button click show info() */
function showHelp() {
	alert("Zombie attack broke out. An old professor, two of his students and a janitor were together running away from zombies. On their way, they found an old bridge across the river. They must cross the bridge to get to safe zone. But the bridge can only carry the weight of 2 people. The professor calculated the zombies would reach the bridge exactly after 17 minutes long. He takes 10 minutes to cross the bridge. The janitor takes 5 minutes, the girl student takes 2 minutes and the boy takes 1 minute. The night was dark and stormy. So it is impossible to cross the bridge without the lamp. Use your time wisely to get everyone to the safe zone. If you take too long (longer than 17 minutes), zombies won't be waiting.");
}
