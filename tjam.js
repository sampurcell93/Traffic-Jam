$(document).ready(function() { 

//class board
	function board() { 

		//currently only ten colors, will add more.
		this.colors = ["red","blue","green","orange","yellow","purple","black","pink","lightblue","star"];
		//will hold array of car objects
		this.carInfo = new Array();
		this.err = "<span class='error'>X</span>";

		//when car array is made and applied, give color.
		this.addColor = function() { 
			var car = $(".car");
			var cars = car.length;
		
			for (var i = 0; i < cars; i++) { 
		
				if (i == cars - 1) {
					car.eq(i).addClass("star");
					break;
				}

				car.eq(i).addClass(this.colors[i]);

			}
		};
		//put cars into the game board
		this.putCars = function() { 

			var board = $("#game");
			var car;

			for (var i = 0; i < this.carInfo.length; i++) { 

				car = document.createElement("div");
				$car = $(car);
				$car.addClass("car");
				$car.attr("data-name",i);
				if (this.carInfo[i].orientation == "h")
					$car.attr("data-or","horizontal");
				else 
					$car.attr("data-or","vertical");
			
				//classes are immutable here, so color, length, and orientation are all classes.
				$car.attr("data-len",this.carInfo[i].len); //give length
				$car.addClass(this.colors[i]); // color
				//positions are 0 indexed, and imagined as the first quadrant of a cartestian graph.
				$car.attr("style","bottom:" + this.carInfo[i].vPos + "00px;"); //vert position 
				$car.attr("style",$car.attr("style") + "left:"    + this.carInfo[i].hPos + "00px; "); // horizontal pos
				$($car).appendTo(board);

			}
			this.addColor();

			this.compile();
		};
		//adds left and right buttons based on proximity to edges.
		this.compile = function() { 

			var rightBtn = "<span class='right-btn' data-change='100'></span>";
			var leftBtn = "<span class='left-btn' data-change='-100'></span>";
			var upBtn = "<span class='up-btn' data-change='100'></span>";
			var downBtn = "<span class='down-btn' data-change='-100'></span>";;

			$("[data-or=horizontal]").each(function() {

				var $this = $(this);
				$this.empty();
				var left = parseInt($this.css("left"));

				if (left < 400 && $this.attr("data-len") == 2) // if it's not too far right and it's only two long, give a right btn
					$(rightBtn).appendTo($this);
				else if (left < 300 && $this.attr("data-len") == 3) //if length = 3, has to be at least three from edge.
					$(rightBtn).appendTo($this);

				if (left > 0)
					$(leftBtn).appendTo($this);

			 });

			$("[data-or=vertical]").each(function() {

				var $this = $(this);
				$this.empty();
				var bottom = parseInt($this.css("bottom"));

				if (bottom < 400 && $this.attr("data-len") == 2)
					$(upBtn).appendTo($this);
				else if (bottom < 300 && $this.attr("data-len") == 3)
					$(upBtn).appendTo($this);

				if (bottom > 0)
					$(downBtn).appendTo($this);

			});

		};
		//uses expected coordinates to check for a colission.
		this.checkColission = function(xPos, yPos, len, orientation) {

			xPos /= 100;
			xPos = Math.floor(xPos);
			yPos /= 100;
			yPos = Math.floor(yPos);
			var desired = {"x": xPos,"y": yPos};

			//compare the current car's proposed new space to the other cars on the board
			for (var i = 0; i < this.carInfo.length; i++) { 

				var car = this.carInfo[i];
				var checkX = car.hPos;
				var checkY = car.vPos;
				var checkLen = car.len;
				var checkOrient = car.orientation;
				// the two or three coordinates of each car are computed, 
				//then compared the the new square of the car being moved.
				var coords = [{"x": checkX,"y": checkY}]; 

				if (checkOrient == "h"){
					coords.push({"x": checkX + (checkLen-1), "y": checkY});
					if (checkLen == 3)
						coords.push({"x": checkX + (checkLen-2), "y": checkY});
				}
				else{ 
					coords.push({"x": checkX , "y": checkY + (checkLen-1)});
					if (checkLen == 3)
						coords.push({"x": checkX , "y": checkY + (checkLen-2)});
				}

				for (var c = 0; c < coords.length; c++) {

					if (desired.x == coords[c].x && desired.y == coords[c].y)
						return false;
				}
			}
			return true;
		};
		this.checkWin = function(xPos, yPos) { 

			return xPos == 400 && yPos == 300;

		}
		this.error = function($button) { 

			$button.parent().append(board.err);
			var err = $button.parent().find(".error");

			if ($button.hasClass("right-btn"))
				err.css({"right":"0", "top":"10px"});
			else if ($button.hasClass("left-btn"))
				err.css({"left":"0","top":"10px"});
			else if ($button.hasClass("up-btn"))
				err.css({"top":"0","left":"10px"});
			else 
				err.css({"bottom":"0","left":"10px"});

			err.hide().fadeIn("slow").delay(250).fadeOut("slow", function() {

				$(this).remove();

			});

		}

	}

	//each car object is stored in the board with its coords, length, and orientation
	function car(hPos, vPos, orientation, len) { 

		this.hPos = hPos;
		this.vPos = vPos;
		this.orientation = orientation;
		this.len = len;

	}
	//the four boards from the assignment.
	function preMade() { 

		this.board1 = [ 
			{ hPos: 0,vPos: 2,orientation: 'h',len: 3},
			{ hPos: 2,vPos: 3,orientation: 'v',len: 3},
			{ hPos: 4,vPos: 5,orientation: 'h',len: 2},
			{ hPos: 5,vPos: 0,orientation: 'v',len: 3},
			{ hPos: 0,vPos: 3,orientation: 'h',len: 2}
		];
		this.board2 = [ 

			{ hPos: 0,vPos: 0,orientation: 'h',len: 3},
			{ hPos: 0,vPos: 1,orientation: 'v',len: 2},
			{ hPos: 1,vPos: 1,orientation: 'h',len: 2},
			{ hPos: 3,vPos: 0,orientation: 'v',len: 2},
			{ hPos: 4,vPos: 0,orientation: 'v',len: 2},
			{ hPos: 5,vPos: 0,orientation: 'v',len: 3},
			{ hPos: 2,vPos: 2,orientation: 'v',len: 3},
			{ hPos: 3,vPos: 2,orientation: 'h',len: 2},
			{ hPos: 5,vPos: 3,orientation: 'v',len: 2},
			{ hPos: 0,vPos: 3,orientation: 'h',len: 2}
		];
		this.board3 = [ 

			{ hPos: 0,vPos: 1,orientation: 'h',len: 3},
			{ hPos: 1,vPos: 0,orientation: 'h',len: 2},
			{ hPos: 2,vPos: 2,orientation: 'v',len: 3},
			{ hPos: 0,vPos: 5,orientation: 'h',len: 3},
			{ hPos: 3,vPos: 2,orientation: 'h',len: 2},
			{ hPos: 3,vPos: 4,orientation: 'v',len: 2},
			{ hPos: 4,vPos: 0,orientation: 'v',len: 2},
			{ hPos: 5,vPos: 2,orientation: 'v',len: 2},
			{ hPos: 5,vPos: 4,orientation: 'v',len: 2},
			{ hPos: 0,vPos: 3,orientation: 'h',len: 2}
		];
		this.board4 = [ 

			{ hPos: 0,vPos: 0,orientation: 'v',len: 2},
			{ hPos: 1,vPos: 0,orientation: 'v',len: 2},
			{ hPos: 2,vPos: 0,orientation: 'v',len: 2},
			{ hPos: 0,vPos: 2,orientation: 'h',len: 3},
			{ hPos: 2,vPos: 3,orientation: 'v',len: 2},
			{ hPos: 4,vPos: 0,orientation: 'h',len: 2},
			{ hPos: 4,vPos: 1,orientation: 'h',len: 2},
			{ hPos: 4,vPos: 2,orientation: 'v',len: 3},
			{ hPos: 5,vPos: 2,orientation: 'v',len: 2},
			{ hPos: 0,vPos: 3,orientation: 'h',len: 2}
		];
	}

	var preMade_boards = new preMade();
	var board = new board(); 			//initialize a new board

	//when an input is made, limit to one char, and go to next input.
	$(".carData").keyup(function() {

		var maxLen = 1;

		if ($(this).val().length > maxLen) {

			$(this).val($(this).val().substring(0,1));

		}

		$(this).next().focus();

		if ($(this).index() == $(".carData").length - 1)
			$(".carData").eq(0).focus();

	});

	$(".addCar").on("click",function() { 

		//the inputs have class carData
		var carData = $(".carData");
		var hPos, vPos, orientation, len;
		var flag = false;
		for (var i = 0; i < carData.length; i++) {  //check if all fields are entered correctly.

			var carVal = carData.eq(i).val();
		
			if (carVal == "") { 
				flag = true;
				break;

			}
			//if good input, set values and push to array of cars
			else if (i == 0) { 
				if (carVal > 5) {
					flag = true;
					break;
				}
				hPos = carVal;
			}
			else if (i == 1) { 
				if (carVal > 5) { 
					flag = true;
					break;
				}
				vPos = carVal;
			}
			else if (i == 2) { 
				if (carVal != "h" && carVal != "v"){ 
					flag = true;
					break;
				}
				orientation = carVal;
			}
			else { 
				if (carVal != 2 && carVal != 3) {
					flag = true;
					break;
				}
				len = carVal;
				board.carInfo.push(new car(hPos,vPos, orientation, len));
			}
			carData.eq(i).val("");
		}
		if (flag)
				alert("Your inputs are malformed. Integers [0,4] for X and Y, h or v for O, and 2 or 3 for L.");
		else { 
			$(".preMade").slideUp();
			$("#game").children(":not(.middleBorder)").remove();
			board.putCars();
		}

	});

	$(".finish").on("click",function() {

		//hide input console when done
		$(".wrapInputs, .options").slideUp();
		$(".preMade").slideUp();
		$("#game").children(":not(.middleBorder)").remove();
		board.putCars();

	});
	//when going left, check for colissions
	$(".right-btn, .left-btn").live("click",function() { 
		var $this = $(this);
		var left = parseInt($this.parent().css("left"));
		var change = parseInt($this.attr("data-change"));
		var yPos = parseInt($this.parent().css("bottom"));
		var len = parseInt($this.parent().attr("data-len"));
		var orientation = $this.parent().attr("data-or");
		var name = parseInt($this.parent().attr("data-name"));
		var valid;

		if ($this.hasClass("right-btn"))
			valid = board.checkColission((left+100*(len-1)+change), yPos, len, orientation);
		else 
			valid = board.checkColission((left+change), yPos, len, orientation);

		if (valid) {
			//if the move is valid, change the car's data in the array, and move it on the board
			$this.parent().css("left", left + change + "px");
			board.compile();
			board.carInfo[name].hPos = (left + change)/100;

			//if the car moved right, check a win.
			if ($this.hasClass("right-btn")) {
				if (board.checkWin(left + 100, yPos)) { 
					alert("You've won! Play another game! I dare you.")
					document.location.reload(true);
				}
			}
		}	
		else
			board.error($this);
			

	});

	$(".up-btn, .down-btn").live("click",function() { 
		var $this = $(this);
		var left = parseInt($this.parent().css("left"));
		var change = parseInt($this.attr("data-change"));
		var yPos = parseInt($this.parent().css("bottom"));		
		var len = $this.parent().attr("data-len");
		var name = parseInt($this.parent().attr("data-name"));
		var orientation = $this.parent().attr("data-or");

		if ($this.hasClass("up-btn"))
			valid = board.checkColission(left, yPos+100*(len-1)+change, len, orientation);
		else 
			valid = board.checkColission(left, yPos+change, len, orientation);


		if (valid) {
			$this.parent().css("bottom", yPos + change + "px");
			board.compile();
			board.carInfo[name].vPos = (yPos + change)/100;
		}
		else
			board.error($this);
			
	});

	//if the user picks a board, set the board's car info to the premade car info, then generate the board.
	$(".preMade").find("li").on("click",function() { 

		var boardChoice = parseInt($(this).attr("data-board"));

		switch(boardChoice) {

			case 1:
			board.carInfo = preMade_boards.board1;
			break;
			case 2:
			board.carInfo = preMade_boards.board2;
			break;
			case 3:
			board.carInfo = preMade_boards.board3;
			break;
			case 4:
			board.carInfo = preMade_boards.board4;
			break;
			case 5:
			board.carInfo = preMade_boards.board5;
			break;
		}

		$(".finish").trigger("click");

	});

});