var $slide = document.getElementById('slide-streams2');

var $cube = $slide.querySelector('.cube');

$cube.addEventListener('click', function () {
  if ($cube.classList.contains('read')) {
    $cube.classList.remove("read");
    $cube.classList.add("t1");
    setTimeout(function () {
      $cube.classList.add("circle");
    }, 1000);
  } else if ($cube.classList.contains('t1')) {
    $cube.classList.remove("t1");
    $cube.classList.add("t2");
    setTimeout(function () {
      $cube.classList.add("pacman");
    }, 1000);
  } else if ($cube.classList.contains('t2')) {
    $cube.classList.remove("t2");
    $cube.classList.add("write");
  } else if($cube.classList.contains('write')) {
    $cube.classList.remove("write");
    $cube.classList.remove("circle");
    $cube.classList.remove("pacman");
  } else {
    $cube.classList.add("read");
  }
});