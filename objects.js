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

function createBackground()
{
  var material = new THREE.MeshBasicMaterial( { color: "white", opacity: 0.0 } );
  material.transparent = true;
  var background = createSquare(phone_height, phone_width * 3, 5, "", material);
  return background;
}

function createForeground()
{
  var material = new THREE.MeshBasicMaterial( { color: "black", opacity: 0.7 } );
  material.transparent = true;
  var foreground = createSquare(phone_height + 20, phone_width + 20, 1, "", material);
  return foreground;
}

function createEars(texture)
{
  var material = new THREE.MeshBasicMaterial( { color: "white", opacity: 1 } );
  material.transparent = true;

  var height = ARTHUR_HEIGHT;

  var ears = createSquare(EARS_HEIGHT, EARS_WIDTH, 1, "", material);

  ears.material.map = texture;
  return ears;
}

function createArthur(texture)
{
  var material = new THREE.MeshBasicMaterial( { color: "white", opacity: 1 } );
  material.transparent = true;

  var arthur = createSquare(ARTHUR_HEIGHT, ARTHUR_WIDTH, 2, "", material);
  arthur.material.map = texture;
  return arthur;
}

function createColumn(top, height, texture)
{
  var material = new THREE.MeshBasicMaterial( { color: "white", opacity: 1 } );
  material.transparent = true;

  var column = null;
  column = createSquare(COLUMN_HEIGHT, COLUMN_WIDTH, 3, "", material);
  column.material.map = texture;

  column.position.x = (phone_width / 2) + COLUMN_WIDTH;

  var visible_height = (phone_height / 2) - height;
  if (top == true)
  {
    column.position.y += (phone_height / 2) + visible_height;
  }
  else
  {
    column.position.y -= (phone_height / 2) +   visible_height;
  }
  return column;
}