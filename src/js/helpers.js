export const setButtonsDisabled = (buttonsSelectOpcions, value) => {
  buttonsSelectOpcions.forEach((b) => (b.disabled = value));
};

export const initializeHtml = (markersGameHtml, divsImgHtml, ...args) => {
  markersGameHtml.forEach((s) => (s.innerHTML = 0));
  divsImgHtml.forEach((d) => (d.innerHTML = ""));
};

export const setNamePlayerOne = (namePlayerHtml, namePlayer = "Jugador 1") => {
  namePlayerHtml.innerHTML = namePlayer;
};

export const setImagesHtml = (select, div) => {
  div.innerHTML = "";
  const imgHtml = document.createElement("img");
  imgHtml.src = `assets/images/${select}.svg`;
  div.append(imgHtml);
};

export const setPointsPlayer = (selections) => {
  const opcionsPLayerList = [
      ["paper", "rock"],
      ["rock", "scissors"],
      ["scissors", "paper"],
    ],
    opcionsComputerList = [
      ["rock", "paper"],
      ["scissors", "rock"],
      ["paper", "scissors"],
    ];

  const findInArray = (selectPlayer,slectComputer,array) => array.find(([a,b])=>(a===selectPlayer && b===slectComputer));

  if (findInArray(...selections,opcionsPLayerList)) return 0;
  if (findInArray(...selections,opcionsComputerList)) return 1;

  return 2;
};




