var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');
var indicadorDeColor = document.getElementById("indicador-de-color");
colorPersonalizado.addEventListener('change',
  (function () {
    // Se guarda el color de la rueda en colorActual
    colorActual = colorPersonalizado.value;
    // Completar para que cambie el indicador-de-color al colorActual
    indicadorDeColor.style.background = colorActual;

  })
);
function changeSelectedColor(e) {
  indicadorDeColor.style.background = e.target.style.backgroundColor;
}
function createPalette() {
  var paleta = document.getElementById("paleta");
  var newDiv;
  for (var i = 0; i < nombreColores.length; i++) {
    newDiv = document.createElement("div");
    newDiv.className = "color-paleta";
    newDiv.style.backgroundColor = nombreColores[i];
    newDiv.addEventListener("click", changeSelectedColor);
    paleta.appendChild(newDiv);
  }
}
var mousePressed = false;
document.addEventListener("mousedown", function () { mousePressed = true; });
document.addEventListener("mouseup", function () { mousePressed = false; });



function createCanvas() {
  var grillaPixeles = document.getElementById("grilla-pixeles");
  var newPixel;
  for (var i = 0; i < 1750; i++) {
    newPixel = document.createElement("div");
    newPixel.addEventListener("click", function (e) {
      e.target.style.backgroundColor = indicadorDeColor.style.background;

    });
    newPixel.addEventListener("mousemove", function (e) {
      if (mousePressed) {
        e.target.style.backgroundColor = indicadorDeColor.style.background;
      }
    });
    grillaPixeles.appendChild(newPixel);
  }
}
function erraseCanvas() {
  var $canvas = $("#grilla-pixeles").children("div");
  for (i = 0; i < $canvas.length; i++) {
    $($canvas[i]).animate({ backgroundColor: "white" }, 2000);
  }
}
$("#borrar").click(erraseCanvas);
$("#guardar").click(guardarPixelArt);

var $superHeroes = $(".imgs").children("li").children("img");
$superHeroes.click(function () { cargarSuperheroe($(this).attr("id"))});

createPalette();
createCanvas();
