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
// 53 pixeles por fila
// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var indicadorDeColor = document.getElementById("indicador-de-color");
var colorPersonalizado = document.getElementById('color-personalizado');
var currentTool = "none";
colorPersonalizado.addEventListener('change',
  (function () {
    // Se guarda el color de la rueda en colorActual
    colorActual = colorPersonalizado.value;
    // Completar para que cambie el indicador-de-color al colorActual
    indicadorDeColor.style.background = colorActual;

  })
);


var mousePressed = false;
document.addEventListener("mousedown", function () { mousePressed = true; });
document.addEventListener("mouseup", function () { mousePressed = false; });


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


function createCanvas() {
  var grillaPixeles = document.getElementById("grilla-pixeles");
  var newPixel;
  for (var i = 1; i <= 1750; i++) {
    newPixel = document.createElement("div");
    newPixel.id = i;
    newPixel.addEventListener("click", function (e) {
      switch (currentTool) {
        case 'indicador-de-color':
          paintBrush(e);
          break;
        case 'shape':
          paintShape(e.target.id);
          break;
        case 'erraser':
          erraseBrush(e);
          break;
      }
    });
    newPixel.addEventListener("mousemove", function (e) {
      if (mousePressed) {
        switch (currentTool) {
          case 'indicador-de-color':
            paintBrush(e);
            break;
          case 'shape':
            paintShape(e.target.id);
            break;
          case 'erraser':
            erraseBrush(e);
            break;
        }
      }
    });
    grillaPixeles.appendChild(newPixel);
  }
}

function changeTool(tool) {
  $("#" + currentTool).css({ border: "solid #000000 2px", 'box-shadow': '0px 0px 0px #000000' });
  $("#" + tool).css({ border: "solid #000000 2px", 'box-shadow': '-5px 5px 0px #000000' });

  currentTool = tool;
}

function paintBrush(e) {
  e.target.style.backgroundColor = indicadorDeColor.style.background;
}
function erraseBrush(e) {
  e.target.style.backgroundColor = 'white';
}
function paintShape(e) {
  var size = 5;
  var useSize = ((size - 1) / 2)
  var index = e - 0;
  for (var i = useSize * -1; i <= useSize; i++) {
    if (i < 0) {
      for (var j = useSize * -1 + i * -1; j <= useSize - i * -1; j++) {
        if (document.getElementById(index + i * 53 + j) != null) {
          document.getElementById(index + i * 53 + j).style.backgroundColor = indicadorDeColor.style.background;
        }
      }
    } else {
      for (j = -2 + i; j <= 2 - i; j++) {
        if (document.getElementById(index + i * 53 + j) != null) {
          document.getElementById(index + i * 53 + j).style.backgroundColor = indicadorDeColor.style.background;
        }
      }
    }
  }
}
function erraseCanvas() {
  var $canvas = $("#grilla-pixeles").children("div");
  for (var i = 0; i < $canvas.length; i++) {
    $($canvas[i]).animate({ backgroundColor: "white" }, 2000);
  }
}

function fillCanvas() {
  var $canvas = $("#grilla-pixeles").children("div");
  for (var i = 0; i < $canvas.length; i++) {
    $($canvas[i]).animate({ backgroundColor: $("#indicador-de-color").css("background") }, 100);
  }
}



createPalette();
createCanvas();
/* eventos en las herramientas */
$(document).ready(function () {
  $("#indicador-de-color").click(function () { changeTool("indicador-de-color"); });
  $("#shape").click(function () { changeTool("shape"); });
  $("#clear").click(erraseCanvas);
  $("#save").click(guardarPixelArt);
  $("#fill").click(fillCanvas);
  $("#fill").mouseenter(function () {
    $(this).animate({ backgroundColor: $("#indicador-de-color").css("background") }, 300);
  });
  $("#fill").mouseleave(function () {
    $(this).animate({ backgroundColor: "white" }, 100);
  });
  /* eventos en imagenes super heroes */
  $("#erraser").click(function () { changeTool("erraser"); });
  $('#batman').click(function () { cargarSuperheroe(batman); })
  $('#wonder').click(function () { cargarSuperheroe(wonder); })
  $('#flash').click(function () { cargarSuperheroe(flash); })
  $('#invisible').click(function () { cargarSuperheroe(invisible); })

})
