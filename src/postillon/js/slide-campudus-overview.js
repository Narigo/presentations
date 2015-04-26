var adj = [ 'attraktiven', 'beliebten', 'bescheidenen', 'coolen', 'epischen', 'erfahrenen', 'fröhlichen', 'guten', 'gnädigen', 'humorvollen', 'kaputten', 'klaustrophobischen', 'liebevollen', 'multidimensionalen', 'prämierten', 'tollen', 'verdorbenen', 'vergnügten', 'verschrobenen', 'zauberhaften' ];
var sub = [ 'Designer', 'Freunde', 'Gorillas', 'Helden', 'Jungs', 'Kids', 'Kellerkinder', 'Knacker', 'Kollegen', 'Krieger', 'Männer', 'Nerds', 'Ninjas', 'Opas', 'Roboter', 'Tiere', 'Typen', 'Programmierer', 'Zauberer', 'Zebras' ];

var $slide = document.getElementById('slide-campudus-overview');
var texts = [];
texts[0] = $slide.querySelector('.text-1');
texts[1] = $slide.querySelector('.text-2');
texts[2] = $slide.querySelector('.text-3');

var i = 0;
var running = false;
var timer;

function next() {
  i = (i + 1) % 3;
  texts[i].classList.add('prev');
  texts[i].classList.remove('active');
  texts[i].classList.remove('next');
  texts[(i + 1) % 3].classList.add('active');
  texts[(i + 1) % 3].classList.remove('next');
  texts[(i + 1) % 3].classList.remove('prev');
  texts[(i + 2) % 3].innerHTML = '... die ' + adj[Math.floor(Math.random() * adj.length)] + ' ' + sub[Math.floor(Math.random() * sub.length)];
  texts[(i + 2) % 3].classList.add('next');
  texts[(i + 2) % 3].classList.remove('prev');
  texts[(i + 2) % 3].classList.remove('active');

  if (running) {
    timer = setTimeout(next, 1500);
  }
}

function start() {
  running = true;
  next();
}

function stop() {
  running = false;
  clearTimeout(timer);
}

module.exports = {
  start : start,
  stop : stop
};
