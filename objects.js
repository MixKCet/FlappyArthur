function createSquare(height, width, depth, color, material)
{
  var geometry = new THREE.BoxGeometry( width, height, 1 );
  if (!material)
  {
    material = new THREE.MeshBasicMaterial( { color: color } );
  }
  var cube = new THREE.Mesh( geometry, material );

  cube.position.z -= depth;
  return cube;
}

function createBackground(texture)
{
  var material = new THREE.MeshBasicMaterial( { color: "white", opacity: 0.0 } );
  material.transparent = true;
  var background = createSquare(window_height, window_width * 3, 5, "", material);

  texture.repeat.set((window_width * 3) / 1024, window_height / 1024);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  background.material.map = texture;

  return background;
}

function createForeground()
{
  var material = new THREE.MeshBasicMaterial( { color: "black", opacity: 0.7 } );
  material.transparent = true;
  var foreground = createSquare(2000, 2000, 1, "", material);
  return foreground;
}

function createEars(texture)
{
  var ratio = 158 / 463;

  var material = new THREE.MeshBasicMaterial( { color: "white", opacity: 1 } );
  material.transparent = true;

  var height = ARTHUR_HEIGHT;

  var ears = createSquare(height, height * ratio, 1, "", material);

  ears.material.map = texture;
  return ears;
}

function createArthur(texture)
{
  var ratio = 490 / 963;

  var material = new THREE.MeshBasicMaterial( { color: "white", opacity: 1 } );
  material.transparent = true;

  ARTHUR_HEIGHT = ARTHUR_WIDTH * ratio;
  var arthur = createSquare(ARTHUR_HEIGHT, ARTHUR_WIDTH, 2, "", material);
  arthur.material.map = texture;
  return arthur;
}

function createColumn(top, height, texture)
{
  var ratio = 118 / 600;

  var material = new THREE.MeshBasicMaterial( { color: "white", opacity: 1 } );
  material.transparent = true;

  var column = null;
  column = createSquare(window_height, window_height * ratio, 3, "", material);
  column.material.map = texture;

  column.position.x = (window_width / 2) + COLUMN_WIDTH;

  var visible_height = (window_height / 2) - height;
  // console.log(visible_height);
  // console.log(height);
  if (top == true)
  {
    column.position.y += (window_height / 2) + visible_height;
  }
  else
  {
    column.position.y -= (window_height / 2) +   visible_height;
  }
  return column;
}