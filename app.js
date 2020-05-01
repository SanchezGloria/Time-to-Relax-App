const song = document.querySelector('.song');
const play = document.querySelector('.play');
console.log(play);

const replay = document.querySelector('.replay');
const outline = document.querySelector('.js-moving-outline circle');
const video = document.querySelector('.js-video');
//Sounds
const btnSounds = document.querySelectorAll('.sound__picker--btn');
console.log(btnSounds);

// const btnSoundRain = document.querySelector('.sound__picker--btn.rain');
// const btnSoundBeach = document.querySelector('.sound__picker--btn.beach');
//Time Display
const clock = document.querySelector('.js-time__display ');
// PARA ANIMAR EL BORDE DEL CÍRCULO
const outlineLength = outline.getTotalLength();
console.log(outlineLength);

//Duration
const timeSelect = document.querySelectorAll('.js-time__select--btn');
// NO ES LA DURACIÓN ACTUAL PERO QUEREMOS QUE SE PARE AHÍ CUANDO SE PULSE EL BOTÓN
let totalDuration = 600;

// outline.style.strokeDasharray = 100; SE VE COMO SI ESTUVIESE DASHED. En un principio este estaba arriba. Si le ponemos el offset = a 200 se ve un trocito blanco. Si lo igualamos a la length, ahora se verá blanco entero y a ese outlinelength vamos a set una cuenta atrás.
// lo vuelve blanco entero
outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
// ^ lo vuelve azul enterito

// CREAR UNA FUNCIÓN PARA PLAY/STOP THE SOUND

const checkPlaying = () => {
  // EL PAUSE LO COGEMOS PORQUE TENEMOS ESA PROPIEDAD DENTRO DEL ATRIBUTO SONG
  if (song.paused) {
    song.play();
    // PARA ANIMAR EL BACKGROUND
    video.play();
    play.src = './svg/pause.svg';
  } else {
    song.pause();
    video.pause();
    play.src = './svg/play.svg';
  }
};

restartSong = () => {
  song.currentTime = 0;
  song.play();
  video.play();
  console.log('reiniciar mi canción');
};

// PARA ANIMAR EL CÍRCULO

song.ontimeupdate = () => {
  let currentTime = song.currentTime;

  let consumedTime = totalDuration - currentTime;
  // EL TIEMPO VA A IR 1,2,3,4... HASTA 60 Y CUANDO LLEGUE, VUELVE A 0
  // SE PUEDE HACER SIN EL MATH.FLOOR PERO TENDRIAMOS 1.23753496 Y PARA TENER UN NÚMERO FLAT (1,2,3,4) SE COGE LA FUNCIÓN
  let seconds = Math.floor(consumedTime % 60);
  // 60 SECS ENTRE 60 VA A SER 1MIN
  let minutes = Math.floor(consumedTime / 60);
  clock.innerHTML = `${minutes}:${seconds}`;
  // ANIMAR EL CÍRCULO

  let progress = outlineLength - (currentTime / totalDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;
  // ESTO ES COMO EL BOTON DE RESET. PARA QUE LA CANCION NO SIGA, SI EL TIEMPO DE LA CANCION ES IGUAL AL TIEMPO QUE LE HEMOS PUESTO, SE CIERRA EL CHIRINGUITO
  if (currentTime >= totalDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = './svg/play.svg';
    video.pause();
  }
};

// ANIMAR EL TEXTO DE LOS MINUTOS
clock.innerHTML = `${Math.floor(totalDuration / 60)}:${Math.floor(totalDuration % 60)}`;

// PARA SELECCIONAR EL NÚMERO DE MINUTOS

changeTotalDuration = (ev) => {
  totalDuration = ev.currentTarget.getAttribute('data-time');
  clock = `${Math.floor(totalDuration / 60)}:${Math.floor(totalDuration % 60)}`;
};

// PARA ELEGIR DIFERENTES SONIDOS

chooseSound = (ev) => {
  song.src = ev.currentTarget.getAttribute('data-sound');
  video.src = ev.currentTarget.getAttribute('data-video');

  checkPlaying(song);
};

// timeSelect.forEach((option) => {
//   option.addEventListener('click', function () {
//     // CAMBIAR LA FAKE DURATION A 10,5,3MIN
//     fakeDuration = this.getAttribute('data-time');
//     // PARA ACTUALIZAR LOS MINUTOS Y SEGUNDOS AL CLICAR EN EL BOTON
//     clock.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
//     // SI CAMBIAMOS EL BOTÓN DEL HTML DE 120 A 10 EN EL TEXTO PONE 10SECS Y EL CIRCULO TAMBIEN DURA 10SCES PERO EL REALIDAD EL BOTON DURA 2MIN ASÍ QUE AL ACABAR LOS 10SECS  EMPIEZA -1 -2 -3...
//   });
// });

// sounds.forEach((sound) => {
//   sound.addEventListener('click', function () {
//     song.src = this.getAttribute('data-sound');
//     video.src = this.getAttribute('data-video');
//     checkPlaying(song);
//   });
// });

// EVENT LISTENERS PARA EL PLAY Y EL PAUSE
play.addEventListener('click', checkPlaying);

replay.addEventListener('click', restartSong);

SelectTimeBtn = () => {
  for (const option of timeSelect) {
    option.addEventListener('click', changeTotalDuration);
  }
};

selectSounds = () => {
  for (const sound of btnSounds) {
    sound.addEventListener('click', chooseSound);
    // console.log(sound);
  }
};

SelectTimeBtn();
selectSounds();
