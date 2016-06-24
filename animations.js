function modifyHTML()
{
	$('#score').css("left",  canvas_left);
	$('#append').css("width", window_width);
	$('#append').css("left",  canvas_left);
	$('#ground').css("width", window_width);
	$('#ground').css("top", window_height);
	$('#ground').css("left",  canvas_left);
	$('#credits').css("width", window_width);
	$('#credits').css("left",  canvas_left + 10);
}

function showStartScreen()
{
	gameover = true;
    foreground.visible = true;
    $("#score").hide();
    $("#message_div").hide();
    $("#message_div").append("<span>"+START_MESSAGE+"</span>");
    $("#message_div").append("<br/>");
    $("#message_div").append("- CLICK TO START -");
    $("#message_div").css("width", window_width);
    $("#message_div").css("top",  canvas_top + (window_height - $("#message_div").height()) / 2); 
    $("#message_div").css("left", canvas_left + (window_width - $("#message_div").width()) / 2); 
    $("#message_div").show();
}

function showWonScreen()
{
	gameover = true;
    foreground.visible = true;
    $("#score").hide();
    $("#message_div").hide();
    $("#message_div").append("<span>"+WON_MESSAGE+"</span>");
    $("#message_div").append("<br/>");
    $("#message_div").append("- CLICK TO PLAY AGAIN -");
    $("#message_div").css("top",  (window.innerHeight - $("#message_div").height()) / 2); 
    $("#message_div").css("left", (window.innerWidth - $("#message_div").width()) / 2); 
    $("#message_div").show();
}

function showGameoverScreen()
{
	gameover = true;
	foreground.visible = true;
	$("#score").hide();
	$("#message_div").empty();
    $("#message_div").append("<span>"+LOST_MESSAGE+"</span>");
    $("#message_div").append("<br/>");
    $("#message_div").append("<span>You scored "+score+" points.</span>");
    $("#message_div").append("<br/>");
    $("#message_div").append("- CLICK TO TRY AGAIN -");
    $("#message_div").css("top",  (window.innerHeight - $("#message_div").height()) / 2); 
    $("#message_div").css("left", (window.innerWidth - $("#message_div").width()) / 2); 
	$("#message_div").show();
}

function resetGame()
{
	$("#message_div").hide();
    $("#score").show();
	foreground.visible = false;

	for (var i = 0; i < columns.length; i++)
	{
		scene.remove(columns[i]);
	}

	columns             = [];
	scored_columns      = [];
	arthur.position.y   = ARTHUR_STARTING_Y;
    gameover            = false;
    score               = 0
    cdt                 = 0;
    arthur_acceleration = 0;
    seconds             = COLUMN_GEN_SPEED;

    // game variables
    current_col_gen_speed  = COLUMN_GEN_SPEED;
    current_col_move_speed = COLUMN_MOVE_SPEED;
    current_gap_percentage = GAP_PERCENTAGE;
    current_max_gap = MAX_GAP;
    current_min_gap = MIN_GAP;
    ear_flap_animation  = { "start": false, "current": 0, "finish": 0.15 };

	$("#score").text("Score: " + score);
}

function checkRemoveColumn(column)
{
	if (column.position.x + (COLUMN_WIDTH/2) < -(phone_width / 2))
	{
		return true;
	}
	return false;
}

function isCollision(arthur, columns)
{
	if ((arthur.position.y - (ARTHUR_HEIGHT/2)) > (phone_height / 2))
	{
		return true;
	}

	if ((arthur.position.y + (ARTHUR_HEIGHT/2)) < -(phone_height / 2))
	{
		return true;
	}

	var rect1 = { "x": arthur.position.x, "y": arthur.position.y, "width": ARTHUR_WIDTH, "height": ARTHUR_HEIGHT };
	rect1.x -= (rect1.width/2);
	rect1.y -= (rect1.height/2);
	for (var i = 0; i < columns.length; i++)
	{
		var rect2 = { "x": columns[i].position.x, "y": columns[i].position.y, "width": COLUMN_WIDTH, "height": columns[i].geometry.parameters.height };
		rect2.x -= (rect2.width/2);
		rect2.y -= (rect2.height/2);
		if (rect1.x < rect2.x + rect2.width &&
		    rect1.x + rect1.width > rect2.x &&
		    rect1.y < rect2.y + rect2.height &&
		    rect1.height + rect1.y > rect2.y) {
		    return true;
		}
	}
	return false;
}

function moveArthur(arthur, dt)
{
	arthur.position.y += arthur_acceleration * dt;
}

function moveColumns(columns, dt)
{
	background.position.x -= current_col_move_speed * dt;
	if (background.position.x < 0)
	{
		background.position.x += 1024;
	}


	for (var i = 0; i < columns.length; i++)
	{
		columns[i].position.x -= current_col_move_speed * dt;
	}
}

