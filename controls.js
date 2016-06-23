document.onkeydown = handleKeyDown;
document.onmousedown = handleMouseDown;

$("body").on("tap", function() {
	if (gameover)
	{
		resetGame();
	}
	else
	{
		jumpArthur()
	}
});

function jumpArthur()
{
	ear_flap_animation.start = true;
  	ears.material.map = ear_texture;
  	arthur_acceleration = JUMP_ACCELERATION;
}

function handleKeyDown(event)
{
    var key = event.keyCode;
    if (key == 32)
    {
    	jumpArthur()
    }
}

function handleMouseDown(event)
{  
	var button = event.button;
	switch (button)
	{
		// left click
		case 0:
			if (gameover)
			{
				resetGame();
			}
			else
			{
				jumpArthur()
			}
			break;
	}
}