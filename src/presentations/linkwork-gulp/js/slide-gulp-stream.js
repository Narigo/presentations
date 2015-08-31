var $slide = document.getElementById('gulp-stream');

var $file = $slide.querySelector('.file');

$file.addEventListener('click', function () {
  if ($file.classList.contains('read')) {
    $file.classList.remove("read");
    $file.classList.add("t1");
    setTimeout(function () {
      $file.classList.add("concat");
    }, 1000);
  } else if ($file.classList.contains('t1')) {
    $file.classList.remove("t1");
    $file.classList.add("t2");
    setTimeout(function () {
      $file.classList.add("minify");
    }, 1000);
  } else if ($file.classList.contains('t2')) {
    $file.classList.remove("t2");
    $file.classList.add("write");
  } else if($file.classList.contains('write')) {
    $file.classList.remove("write");
    $file.classList.remove("concat");
    $file.classList.remove("minify");
  } else {
    $file.classList.add("read");
  }
});