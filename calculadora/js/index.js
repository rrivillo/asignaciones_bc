// Variables necesarias

var displayDiv = document.querySelector("#display");
var numA = ""; // Si ponía 0 en vez de vacío, cada vez que se hiciera click, se iban a sumar
var numB = "";
var operator = "";

// Funciones

function press(element) {
  numA += element;
  displayDiv.innerText = numA;
}

function setOP(element) {
  operator = element;
  numB = numA; // Al hacer click en el operador, display debe mostrar el número con el cual se debe manipular el priemr número. Esto afecta directamente.
  numA = "";
}

function clr() {
  numA = "";
  numB = "";
  operator = "";
  displayDiv.innerText = 0; // reseteamos todos los valores y mostramos 0 en display
}

function calculate() {
  // Si hubiesen sido números enteros, no habría más que un parseInt, pero como pudiese haber decimales, mejor nos aseguramos con un parseFloat
  var a = parseFloat(numB);
  var b = parseFloat(numA);
  var result = 0; // Esta variable la usaremos para almacenar el resultado de las operaciones
  // Lo ideal hubiuese sido con un switch, pero la elección será un If, para mostrar pasos detalladamente
  if (operator == "+") {
    result = a + b;
  } else if (operator == "-") {
    result = a - b;
  } else if (operator == "*") {
    result = a * b;
  } else if (operator == "/") {
    result = a / b;
  }

  numA = result;
  operator = "";
  displayDiv.innerText = result;
}
