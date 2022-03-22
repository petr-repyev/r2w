$(function() {
  var $alertBox = $('#js__alert'),
    $alertBoxCloser = $('#js__alert-close'),
    $body = $('body'),
    alertTo,

    CLASS_ALERTED = 'is__alerted',
    CLASS_NERVOUS = 'nervous';

  function checkAlert($alert) {
    var h = $alert.outerHeight();
    $('<style type="text/css"> .' + CLASS_ALERTED + ' .' + CLASS_NERVOUS + ', .' + CLASS_ALERTED + '.' + CLASS_NERVOUS + ' { margin-top: ' + h + 'px; }</style>')
    .appendTo('head');
  }

  checkAlert($alertBox);

  $alertBoxCloser.on('click', function(e) {
    e.preventDefault();
    $body.removeClass(CLASS_ALERTED);
  });

  $(window).on('resize', function() {
    clearTimeout(alertTo);
    alertTo = setTimeout(function() {
      checkAlert($alertBox);
    }, 100);
  });
});
