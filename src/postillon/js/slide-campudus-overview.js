var adj = [ 'attraktiven', 'beliebten', 'bescheidenen', 'coolen', 'epischen', 'erfahrenen', 'fröhlichen', 'guten', 'gnädigen', 'humorvollen', 'kaputten', 'klaustrophobischen', 'liebevollen', 'multidimensionalen', 'prämierten', 'tollen', 'verdorbenen', 'vergnügten', 'verschrobenen', 'zauberhaften' ];
var sub = [ 'Designer', 'Freunde', 'Gorillas', 'Helden', 'Jungs', 'Kids', 'Kellerkinder', 'Knacker', 'Kollegen', 'Krieger', 'Männer', 'Nerds', 'Ninjas', 'Opas', 'Roboter', 'Tiere', 'Typen', 'Programmierer', 'Zauberer', 'Zebras' ];

var $slide = document.getElementById('slide-campudus-overview');
var adjs = [];
var subs = [];
adjs[0] = $slide.querySelector('.adj.text-1');
adjs[1] = $slide.querySelector('.adj.text-2');
subs[0] = $slide.querySelector('.sub.text-1');
subs[1] = $slide.querySelector('.sub.text-2');

var i = 0;
var running = false;
var timer;

function next() {
  adjs[i].innerHTML = adj[Math.floor(Math.random() * adj.length)];
  subs[i].innerHTML = sub[Math.floor(Math.random() * sub.length)];
  adjs[i].style.translateY = '-50';
  adjs[i].classList.add('active');
  adjs[i].classList.remove('inactive');
  subs[i].classList.add('active');
  subs[i].style.translateY = '50';
  subs[i].classList.remove('inactive');
  i = (i + 1) % 2;
  adjs[i].classList.add('inactive');
  adjs[i].classList.remove('active');
  subs[i].classList.add('inactive');
  subs[i].classList.remove('active');

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
