var adj = [ 'attraktiven', 'beliebten', 'bescheidenen', 'coolen', 'epischen', 'erfahrenen', 'fröhlichen', 'guten', 'gnädigen', 'humorvollen', 'kaputten', 'klaustrophobischen', 'liebevollen', 'multidimensionalen', 'prämierten', 'tollen', 'verdorbenen', 'vergnügten', 'verschrobenen', 'zauberhaften' ];
var sub = [ 'Designer', 'Freunde', 'Gorillas', 'Helden', 'Jungs', 'Kids', 'Kellerkinder', 'Knacker', 'Kollegen', 'Krieger', 'Männer', 'Nerds', 'Ninjas', 'Opas', 'Roboter', 'Tiere', 'Typen', 'Programmierer', 'Zauberer', 'Zebras' ];

var $slide = document.getElementById('slide-campudus-overview');
var texts = [];
texts[0] = $slide.querySelector('.text-1');
texts[1] = $slide.querySelector('.text-2');

var i = 0;
var running = false;
var timer;

function next() {
  texts[i].innerHTML = adj[Math.floor(Math.random() * adj.length)] + ' ' + sub[Math.floor(Math.random() * sub.length)];
  texts[i].style.translateY = '-50';
  texts[i].classList.add('active');
  texts[i].classList.remove('inactive');
  i = (i + 1) % 2;
  texts[i].classList.add('inactive');
  texts[i].classList.remove('active');

  if (running) {
    timer = setTimeout(next, 1000);
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
