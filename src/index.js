import "./styles.css";
import {
  setButtonsDisabled,
  initializeHtml,
  setNamePlayerOne,
  setImagesHtml,
  setPointsPlayer,
  addPoints,
  pointsPlayer,
  pointsComputer
} from "./js/helpers";

/**
 * REFERENCIAS HTML
 */
const body = document.querySelector("body"),
  namePlayerHtml = document.querySelector("#nombre"),
  buttonInitHtml = document.querySelector("#btn-init"),
  buttonsSelectOpcions = document.querySelectorAll(".btn-select"),
  markersGameHtml = document.querySelectorAll("span"),
  divsImgHtml = document.querySelectorAll(".card-body");

/**
 * Variables globales
 *
 */
const opcionsComputer = ["paper", "rock", "scissors"];
let turnos = 0;
let nombreInicialJugador = "Jugador 1";

const setJuego = () => {
  setButtonsDisabled(buttonsSelectOpcions, true);
  setNamePlayerOne(namePlayerHtml);
  initializeHtml(
    markersGameHtml,
    divsImgHtml,
    turnos
  );
  buttonInitHtml.disabled = false;
  nombreInicialJugador = "";
};

const initGame = (nombreJugador = "Jugador 1", reiniciar = false) => {
  const namePlayer = reiniciar ? nombreJugador : prompt("Ingrese su nombre:");
  setNamePlayerOne(namePlayerHtml, namePlayer ? namePlayer : "Jugador 1");
  setButtonsDisabled(buttonsSelectOpcions, false);
  initializeHtml(
    markersGameHtml,
    divsImgHtml,
    turnos
  );
  buttonInitHtml.disabled = true;
};

buttonInitHtml.addEventListener("click", initGame);

const setOpcionComputer = (Opcjugador, turno) => {
  const index = Math.floor(Math.random() * (3 - 0)) + 0,
    computador = opcionsComputer[index];
  setImagesHtml(computador, divsImgHtml[1]);
  setButtonsDisabled(buttonsSelectOpcions, false);
  const addPointsOpcion = setPointsPlayer([Opcjugador, computador]);
  addPoints(addPointsOpcion,markersGameHtml);
  if (turno === 3) {
    setTimeout(() => {
      determinarGanador(pointsPlayer, pointsComputer);
    }, 800);
  }
};

const turnoComputador = (jugador, turno) => {
  setButtonsDisabled(buttonsSelectOpcions, true);
  setImagesHtml("Spinner", divsImgHtml[1]);
  setTimeout(() => {
    setOpcionComputer(jugador, turno);
  }, 500);
};

const determinarGanador = (pointsPlayer, pointsComputer) => {
  pointsPlayer > pointsComputer
    ? alert("Ganaste!!!")
    : pointsPlayer === pointsComputer
    ? alert("Empate")
    : alert("Perdiste!!!");

  setTimeout(() => {
    confirm("Quieres intentarlo nuevamente")
      ? initGame(nombreInicialJugador, true)
      : setJuego();
  }, 1000);
};

const btnClick = (opcion, div) => {
  setImagesHtml(opcion, div);
  turnos++;
  turnoComputador(opcion, turnos);
};

buttonsSelectOpcions[0].addEventListener("click", () => {
  btnClick("paper", divsImgHtml[0]);
});

buttonsSelectOpcions[1].addEventListener("click", () => {
  btnClick("rock", divsImgHtml[0]);
});

buttonsSelectOpcions[2].addEventListener("click", () => {
  btnClick("scissors", divsImgHtml[0]);
});
