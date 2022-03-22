$(function() {
  var $hoverTogglers,
    $clickTogglers,
    $tboxes = $('.js__tbox'),
    $closers = $('.js__closer'),
    $body = $('body'),
    inTO,
    outTO;

    CLASS_ACTIVE = 'is__active',
    CLASS_TOGGLED = 'is__toggled',
    DURATION = 350;

  if (isMobile) {
    $clickTogglers = $('.js__toggler-click, .js__toggler-hover');
  }
  else {
    $hoverTogglers = $('.js__toggler-hover');
    $clickTogglers = $('.js__toggler-click');

    function HoverToggle($toggler, $tbox) {
      this.$toggler = $toggler;
      this.$tbox = $tbox;
      this.timeout = 0;
    }
    HoverToggle.prototype.toggle = function(toVisible) {
      var $tbox = this.$tbox,
        $toggler = this.$toggler;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function() {
        if (toVisible) {
          $tboxes.removeClass(CLASS_ACTIVE);
          $clickTogglers.removeClass(CLASS_ACTIVE);
          $tbox.addClass(CLASS_ACTIVE);
          $toggler.addClass(CLASS_ACTIVE);
        }
        else {
          $tbox.removeClass(CLASS_ACTIVE);
          $toggler.removeClass(CLASS_ACTIVE);
        }
      }, DURATION);
    }

    $hoverTogglers.each(function() {
        var hoverToggle = new HoverToggle($(this), $tboxes.filter($(this).attr('data-toggle')));

      hoverToggle.$toggler.on('mouseover.toggler', function(e) {
        hoverToggle.toggle(true);
      });
      hoverToggle.$toggler.on('mouseout.toggler', function(e) {
        hoverToggle.toggle(false);
      });
      hoverToggle.$tbox.on('mouseover.toggler', function(e) {
        hoverToggle.toggle(true);
      });
      hoverToggle.$tbox.on('mouseout.toggler', function(e) {
        hoverToggle.toggle(false);
      });
      hoverToggle.$toggler.on('lock', function(e) {
        hoverToggle.toggle(false);
        hoverToggle.$toggler.off('mouseover.toggler');
      });
      hoverToggle.$toggler.on('unlock', function(e) {
        hoverToggle.$toggler.on('mouseover.toggler', function(e) {
          hoverToggle.toggle(true);
        });
      });
    });
  }
  function Toggler($toggler, $tbox, ev) {
    this.$toggler = $toggler;
    this.$tbox = $tbox;
    this.ev = ev;
    this.timeout = 0;
    this.duration = 0;
    var th = this;
    this.$toggler.on('close', function() {
      th.toggle(false);
    });
  }
  Toggler.prototype.toggle = function(toVisible) {
    var $tbox = this.$tbox,
      $toggler = this.$toggler,
      ev = this.ev;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(function() {
      if (toVisible) {
        if (ev) $(document).trigger(ev);
        $tboxes.removeClass(CLASS_ACTIVE);
        $clickTogglers.removeClass(CLASS_ACTIVE);
        $tbox.addClass(CLASS_ACTIVE);
        $toggler.addClass(CLASS_ACTIVE);
        $body.addClass(CLASS_TOGGLED);
      }
      else {
        $(document).trigger(ev + '_off');
        $tbox.removeClass(CLASS_ACTIVE);
        $toggler.removeClass(CLASS_ACTIVE);
        $body.removeClass(CLASS_TOGGLED);
      }
    }, this.duration);
  };

  $clickTogglers.each(function() {
    var toggler = new Toggler($(this), $tboxes.filter($(this).attr('data-toggle')), $(this).data('event'));
    // var $toggler = $(this),
    //   $tbox = $tboxes.filter($toggler.attr('data-toggle')),
    toggler.$toggler.on('click', function() {
      if (toggler.$tbox.hasClass(CLASS_ACTIVE)) {
        toggler.toggle(false);
      }
      else {
        toggler.toggle(true);
      }
      return false;
    });
  });

  $(document).on('click closeall', function() {
    $clickTogglers.trigger('close');
  });

  $closers.on('click', function() {
    $clickTogglers.trigger('close');
  });

  $tboxes.on('click', function(e) {
    e.stopPropagation();
  });

  var $cClicker = $('.js__toggler-category');

  $cClicker.each(function() {
    var $toggler = $(this);
      $tbox = $(this).attr('data-toggle');
    $toggler.on('click', function() {
      if ($(this).hasClass(CLASS_ACTIVE)) {
        $toggler.removeClass(CLASS_ACTIVE);
      }
      else {
        $cClicker.removeClass(CLASS_ACTIVE);
        $toggler.addClass(CLASS_ACTIVE);
      }
      return false;
    });
  });

  $('.js__supercloser').on('click', function() {
    $(document).trigger('closeall');
  });
});


// $(function() {
//   if (isMobile) {
//     $clickTogglers = $('.js__toggler-click, .js__toggler-hover');
//   }
//   else {
//     $hoverTogglers = $('.js__toggler-hover');
//     $clickTogglers = $('.js__toggler-click');
//   }

//   $clickTogglers.each(function() {
//     var $toggler = $(this);
//     $toggler.magnificPopup({
//       type: 'inline',
//       mainClass: 'mfp-top'
//     });
//   });

// });
