var ticker = [
  {
    text : 'Schimmel in den Wänden: Gutachter findet eingemauertes Pferd',
    author : 'mvp',
    nr : '565'
  },
  {
    text : 'Sollte auf A4 zeichnen: Fünftklässler bei Kreuz Köln-Süd von Lkw überfahren',
    author : 'tei',
    nr : '656'
  },
  {
    text : 'Betretene Minen: Bombenräumkommando kam leider zu spät',
    author : 'evw/mla',
    nr : '678'
  },
  {
    text : 'Beinahe draufgegangen: Jesus-Imitator aus See gefischt',
    author : '<a href="https://www.facebook.com/profile.php?id=100003129684891">gad</a>/adg',
    nr : '670'
  },
  {
    text : 'Rote Beete: Streit um Gemüse führt zu Blutbad in Kleingartenverein',
    author : 'marc',
    nr : '586'
  }
];

var $slide = document.getElementById('slide-newsticker');
var texts = [];
texts[0] = $slide.querySelector('.ticker-1');
texts[1] = $slide.querySelector('.ticker-2');
texts[2] = $slide.querySelector('.ticker-3');

var timeout = 10000;
var i = 0;
var running = false;
var timer;
next();

function next() {
  var current = i % 3;
  var nextTicker = i % ticker.length;
  texts[current].querySelector('.text').innerHTML = '++++ ' + ticker[nextTicker].text + ' ++++';
  texts[current].querySelector('.info').innerHTML = '(' + ticker[nextTicker].author + ' in Newsticker #' + ticker[nextTicker].nr + ')';
  texts[current].classList.add('prev');
  texts[current].classList.remove('next');
  texts[current].classList.remove('active');
  i++;
  current = i % 3;
  texts[current].classList.add('active');
  texts[current].classList.remove('next');
  texts[current].classList.remove('prev');
  i++;
  current = i % 3;
  texts[current].classList.add('next');
  texts[current].classList.remove('active');
  texts[current].classList.remove('prev');

  if (running) {
    timer = setTimeout(next, timeout);
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
