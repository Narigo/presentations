var Reveal = require('reveal.js');

var campudusSlide = require('./slide-campudus-overview.js');

Reveal.addEventListener('slidechanged', function (event) {
  if (event.currentSlide.id === 'slide-campudus-overview') {
    campudusSlide.start();
  } else {
    campudusSlide.stop();
  }
});

Reveal.initialize({
  controls : true,
  progress : true,
  history : true,
  center : true,
  // default/cube/page/concave/zoom/linear/fade/none
  transition : 'none',
  dependencies : [
    {
      src : 'plugin/highlight/highlight.js',
      async : true,
      callback : function () {
        hljs.initHighlightingOnLoad();
      }
    }
  ]
});
