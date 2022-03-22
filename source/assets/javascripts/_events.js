$(function() {
  var $headerSide = $('.header-side');
  $(document).on('moveHeader', function() {
    $headerSide.addClass('is__active');
  });
  $(document).on('moveHeader_off', function() {
    $headerSide.removeClass('is__active');
  });
});