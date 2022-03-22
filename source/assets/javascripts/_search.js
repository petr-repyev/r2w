$(function() {
  $('.js__searchform').each(function() {
    var $box = $(this),
      $input = $box.find('.js__searchform-input'),
      $clearer = $box.find('.js__searchform-clearer');

    $clearer.on('click', function(e) {
      $input.val('');
      $box.removeClass('search_done');
      e.preventDefault;
    });

    $box.on('submit', function(e) {
      e.preventDefault();
      // console.log($box.serialize());

      $.ajax({
        type: 'POST',
        url: $box.attr('action'),
        data: $box.serialize(),
        success: function(data) {
          console.log(data);
        }
      });
    })
  });
});
