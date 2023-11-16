// Seleciona todas as teclas de piano e elementos relacionados do DOM
const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");

// Array para armazenar as teclas mapeadas
let mapedKeys = [];

// Objeto de áudio para reproduzir as notas
let audio = new Audio("src/tunes/a.wav");

// Função para tocar uma nota quando uma tecla é clicada
const playTune = (key) => {
  // Atualiza o src do áudio com o arquivo da nota correspondente
  audio.src = `src/tunes/${key}.wav`;
  // Reproduz a nota
  audio.play();

  // Adiciona a classe 'active' à tecla clicada para destacá-la temporariamente
  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");

  // Remove a classe 'active' após 150 milissegundos para retornar ao estado normal
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

// Adiciona um evento de clique a cada tecla de piano
pianoKeys.forEach((key) => {
  key.addEventListener("click", () => playTune(key.dataset.key));
  // Adiciona a tecla mapeada ao array
  mapedKeys.push(key.dataset.key);
});

// Adiciona um evento de escuta para detectar teclas do teclado sendo pressionadas
document.addEventListener("keydown", (e) => {
  // Verifica se a tecla pressionada está mapeada e toca a nota correspondente
  if (mapedKeys.includes(e.key)) {
    playTune(e.key);
  }
});

// Função para lidar com a mudança de volume
const handleVolume = (e) => {
  // Ajusta o volume do áudio com base no valor do controle deslizante
  audio.volume = e.target.value;
};

// Função para mostrar ou ocultar as teclas de piano
const showHideKeys = () => {
  // Alterna a classe 'hide' em cada tecla para mostrar ou ocultar
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

// Adiciona um evento de entrada para o controle deslizante de volume
volumeSlider.addEventListener("input", handleVolume);

// Adiciona um evento de clique ao checkbox para mostrar ou ocultar as teclas de piano
keysCheck.addEventListener("click", showHideKeys);
