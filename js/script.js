const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const formulario = document.querySelector('.formulario');
const inpMovimiento = document.querySelector('.inp-movimiento');
const pError = document.querySelector('.error');

const modal = document.querySelector('.modal');
const btnConfirmar = document.querySelector('.modal__confirmar');
const btnCancelar = document.querySelector('.modal__cancelar');

let punto = {
  x: 0,
  y: 0,
  r: 10,
  color: "#f00",
  movimiento: 20
}
let movimiento;

let maxX = Math.floor(canvas.width / 2 / punto.movimiento);
let maxY = Math.floor(canvas.height / 2 / punto.movimiento);

function dibujar(){
  canvas.width = canvas.width;
  ctx.translate(canvas.width / 2, canvas.height / 2);

  // Líneas
  ctx.lineWidth = 3;
  // Linea vertical
  ctx.beginPath();
  ctx.moveTo(0, -canvas.height / 2);
  ctx.lineTo(0, canvas.height / 2);
  ctx.stroke();
  // Linea horizontal
  ctx.beginPath();
  ctx.moveTo(-canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, 0);
  ctx.stroke();

  // Divisiones
  // Divisiones verticales
  for(let i = 0; i < canvas.height / punto.movimiento; i++){
      ctx.beginPath();
      ctx.moveTo(-10, (-canvas.height / 2) + (i * punto.movimiento) + 10);
      ctx.lineTo(10, (-canvas.height / 2) + (i * punto.movimiento) + 10);
      ctx.stroke();
      if(i - maxY !== 0) ctx.fillText(i - maxY, 15, (-canvas.height / 2) + (i * punto.movimiento) + 10);
  }
  // Divisiones horizontales
  for(let i = 0; i < canvas.width / punto.movimiento; i++){
      ctx.beginPath();
      ctx.moveTo((-canvas.width / 2) + (i * punto.movimiento) + (10), -10);
      ctx.lineTo((-canvas.width / 2) + (i * punto.movimiento) + (10), 10);
      ctx.stroke();
      if(i - maxX !== 0) ctx.fillText(i - maxX, (-canvas.width / 2) + (i * punto.movimiento)+(5), 20);
  }

  // Punto
  ctx.fillStyle = punto.color;
  ctx.beginPath();
  ctx.arc(punto.x, punto.y, punto.r, 0, 2 * Math.PI);
  ctx.fill();

  // Coordenadas
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText(`x: ${punto.x / punto.movimiento}`, -canvas.width/2 + 10, -canvas.height/2 + 20);
  ctx.fillText(`y: ${punto.y / punto.movimiento}`, -canvas.width/2 + 10, -canvas.height/2 + 40);
}

// Evaluar los datos que introduce el usuario y abrir modal para confirmar
function enviar(e){
  e.preventDefault();

  movimiento = inpMovimiento.value[0].toLowerCase();
  
  // Manejo de errores
  if(!movimiento) return;

  if(movimiento != "w" && movimiento != "s" && movimiento != "a" && movimiento != "d"){
    inpMovimiento.value = "";
    pError.classList.add('error--activo');
    return;
  }

  pError.classList.remove('error--activo');

  // Confirmar movimiento
  let texto;
  if(movimiento == "a") texto = "izquierda";
  if(movimiento == "d") texto = "derecha";
  if(movimiento == "w") texto = "arriba";
  if(movimiento == "s") texto = "abajo";
  document.querySelector('.modal__movimiento').textContent = texto;
  modal.classList.add('modal--abierto');
  btnConfirmar.focus();
}

// Al confirmar se cierra la ventana modal y se ejecuta el movimiento
function confirmar(){
  modal.classList.remove('modal--abierto');

  // Movimiento del punto
  if(movimiento == "w" && punto.y / punto.movimiento > -maxY) punto.y -= punto.movimiento;
  if(movimiento == "s" && punto.y / punto.movimiento < maxY) punto.y += punto.movimiento;
  if(movimiento == "a" && punto.x / punto.movimiento > -maxX) punto.x -= punto.movimiento;
  if(movimiento == "d" && punto.x / punto.movimiento < maxX) punto.x += punto.movimiento;

  // Actualizar canvas y reiniciar inputs
  dibujar();
  inpMovimiento.value = "";
  inpMovimiento.focus();
}

// Cerrar modal y no hacer nada
function cancelar(){
  modal.classList.remove('modal--abierto');

  inpMovimiento.value = "";
  inpMovimiento.focus();
}

// EVENTOS
formulario.addEventListener('submit', enviar);

btnConfirmar.addEventListener('click', confirmar);
btnCancelar.addEventListener('click', cancelar);

window.addEventListener('load', dibujar);