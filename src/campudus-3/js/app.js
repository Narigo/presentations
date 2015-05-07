var Reveal = require('reveal.js');

var campudusSlide = require('./slide-campudus-overview.js');
var portfolioSlide = require('./slide-campudus-portfolio.js');

Reveal.addEventListener('slidechanged', function (event) {
  if (event.currentSlide.id === 'slide-campudus-overview') {
    campudusSlide.start();
  } else {
    campudusSlide.stop();
  }
});

Reveal.addEventListener('slidechanged', function (event) {
  if (event.currentSlide.id === 'slide-campudus-portfolio') {
    portfolioSlide.start();
  } else {
    portfolioSlide.stop();
  }
});

var timeGes = 60 * 3 * 1000;
var lastRun = (+new Date());
function timer() {
  var diff = (+new Date()) - lastRun;
  setTimeout(function () {
    lastRun = (+new Date());
    timeGes = timeGes - 1000;
    document.getElementById('timer').innerHTML = nf(Math.max(0, timeGes / 1000));
    timer();
  }, 1000 - diff);
}
timer();

function nf(num) {
  var h = padZero(Math.floor(num / 60 / 60));
  var m = padZero(Math.floor(num / 60));
  var s = padZero(num % 60);
  return h + ':' + m + ':' + s;
}

function padZero(x) {
  return (x < 10) ? '0' + x : '' + x;
}

Reveal.initialize({
  controls : true,
  progress : true,
  history : true,
  center : true,
  // default/cube/page/concave/zoom/linear/fade/none
  transition : 'none',
  dependencies : []
});
