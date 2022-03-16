import "./styles.css";
import {
  setButtonsDisabled,
  initializeHtml,
  setNamePlayerOne,
  setImagesHtml,
  setPointsPlayer,
  selectOpcionComputer,
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
 */
let nombreInicialJugador = "Jugador 1";
let maxShift = 0;
let pointsPlayer = 0;
let pointsComputer = 0;

const resetValues = () => {
  maxShift = 0;
  pointsPlayer = 0;
  pointsComputer = 0;
};

const setJuego = () => {
  setButtonsDisabled(buttonsSelectOpcions, true);
  setNamePlayerOne(namePlayerHtml);
  initializeHtml(markersGameHtml, divsImgHtml);
  buttonInitHtml.disabled = false;
  nombreInicialJugador = "";
};

const initGame = (nombreJugador = "Jugador 1", reiniciar = false) => {
  nombreInicialJugador = reiniciar
    ? nombreJugador
    : prompt("Ingrese su nombre:");
  setNamePlayerOne(
    namePlayerHtml,
    nombreInicialJugador ? nombreInicialJugador : "Jugador 1"
  );
  setButtonsDisabled(buttonsSelectOpcions, false);
  initializeHtml(markersGameHtml, divsImgHtml);
  buttonInitHtml.disabled = true;
};

buttonInitHtml.addEventListener("click", initGame);

const setOpcionComputer = (Opcjugador, turno) => {
  const selectComputer = selectOpcionComputer();
  setImagesHtml(selectComputer, divsImgHtml[1]);
  setButtonsDisabled(buttonsSelectOpcions, false);
  addPoints(setPointsPlayer([Opcjugador, selectComputer]), markersGameHtml);
  if (turno === 3) {
    setButtonsDisabled(buttonsSelectOpcions, true);
    setTimeout(() => {
      determinarGanador(pointsPlayer, pointsComputer);
    }, 800);
  }
};

const addPoints = (number, markersGameHtml) => {
  switch (number) {
    case 0:
      pointsPlayer += 1;
      markersGameHtml[0].innerText = pointsPlayer;
      break;
    case 1:
      pointsComputer += 1;
      markersGameHtml[1].innerText = pointsComputer;
      break;
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

  resetValues();
  setTimeout(() => {
    confirm("Quieres intentarlo nuevamente")
      ? initGame(nombreInicialJugador, true)
      : setJuego();
  }, 1000);
};

const btnClick = (opcion, div) => {
  setImagesHtml(opcion, div);
  maxShift++;
  turnoComputador(opcion, maxShift);
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
