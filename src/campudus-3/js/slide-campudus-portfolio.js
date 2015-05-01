var $slide = document.getElementById('slide-campudus-portfolio');
var i = 0;
var running = false;
var timeout = 900;
var timer;
var images = [
  {name : 'aeoxdesign', count : 3, idx : -1},
  {name : 'datengut', count : 4, idx : -1},
  {name : 'dealercenter', count : 7, idx : -1},
  {name : 'gamegorilla', count : 4, idx : -1},
  {name : 'haibike', count : 4, idx : -1},
  {name : 'postillon', count : 6, idx : -1},
  {name : 'ratiopharm', count : 7, idx : -1},
  {name : 'sinnesfreunde', count : 6, idx : -1},
  {name : 'wegenerwerbung', count : 6, idx : -1}
];

function next() {
  var current, img, $cell, $active, $next, $prev;
  current = images[i % images.length];
  current.idx = (current.idx + 1) % current.count;
  $cell = $slide.querySelector('.' + current.name);
  $next = $cell.querySelector('.next');
  $active = $cell.querySelector('.active');
  $prev = $cell.querySelector('.prev');
  $next.className = 'image active';
  $active.className = 'image prev';
  $prev.className = 'image next';

  img = '<img src="img/' + current.name + '/' + (current.idx + 1) + '.jpg" />';
  console.log(img);
  $next.innerHTML = img;

  i++;
  if (running) {
    timer = setTimeout(next, timeout);
  }
}

function start() {
  running = false;
  for (var x = 0; x < images.length; x++) {
    next();
  }
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
