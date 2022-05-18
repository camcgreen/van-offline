jQuery(document).ready(function ($) {
  function hideUrlBar() {
    if (
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPod/i)
    ) {
      container = document.getElementById('container');
      if (container) {
        var cheight;
        switch (window.innerHeight) {
          case 208:
            cheight = 268;
            break; // landscape
          case 336:
            cheight = 396;
            break; // portrait, in call status bar
          case 356:
            cheight = 416;
            break; // portrait
          default:
            cheight = window.innerHeight;
        }
        if (
          container.offsetHeight != cheight ||
          window.innerHeight != cheight
        ) {
          container.style.height = cheight + 'px';
          setTimeout(function () {
            hideUrlBar();
          }, 1000);
        }
      }
    }

    if (window.pageYOffset == 0) {
      window.scrollTo(0, 1);
    }
  }

  // create the object player with the container
  obj = new object2vrPlayer('van');
  obj.readConfigUrl('Ring Van - Hotspots 2_out.xml');
  // obj.readConfigUrl('http://localhost:5500/Ring Van - Hotspots 2_out.xml');
  // obj.readConfigUrlAsync('Ring Van - Hotspots 2_out.xml');
  // hide the URL bar on the iPhone
  setTimeout(function () {
    hideUrlBar();
  }, 10);

  popup = function (view, tab) {
    $('#' + view).dialog({
      resizable: false,
      draggable: false,
      modal: true,
      width: 1540,
      height: 850,
      closeOnEscape: true,
      open: function () {
        $('.slider').slick({
          arrows: false,
        });
        $('.tabs').responsiveTabs({
          collapsible: false,
          load: function () {
            $('.slider').slick('resize');
          },
          activate: function () {
            $('.slider').slick('unslick');
            $('.slider').slick({
              arrows: false,
            });
          },
        });
      },
      close: function () {
        $('.slider').slick('unslick');
      },
    });
    $(window).resize(function () {
      $('#' + view).dialog('option', 'position', {
        my: 'center',
        at: 'center',
        of: window,
      });
    });
    $('.ui-widget-overlay, .close-popup a').click(function () {
      $('#' + view).dialog('close');
      return false;
    });

    $('.prev-arrow a').click(function () {
      $('.slider').slick('slickPrev');
      return false;
    });

    $('.next-arrow a').click(function () {
      $('.slider').slick('slickNext');
      return false;
    });

    $('.navigation-links a').click(function () {
      $('a', $(this).parent()).removeClass('active');
      $(this).addClass('active');
      slideIndex = $(this).index();
      $('.slider').slick('slickGoTo', slideIndex, false);
      return false;
    });

    $('.slider').on('afterChange', function (event, slick, currentSlide) {
      currentSlide = currentSlide + 1;
      $('.navigation-links a').removeClass('active');
      $('.navigation-links a:nth-child(' + currentSlide + ')').addClass(
        'active'
      );
    });

    $('.slider').on('init', function () {
      $('.navigation-links a').removeClass('active');
      $('.navigation-links a:nth-child(1)').addClass('active');
    });
    $(`#${tab}`).trigger('click');
  };

  $('.slide .options a').click(function () {
    $('a', $(this).parent()).removeClass('active');
    $('.option', $(this).parent().parent()).removeClass('active');
    var href = $(this).attr('href');
    $(href).addClass('active');
    $(this).addClass('active');
    return false;
  });

  $('.play').click(function () {
    $(this).toggleClass('active');
    $('video', $(this).parent()).click();
    return false;
  });

  $('video').click(function () {
    this.paused ? this.play() : this.pause();
  });

  $('video').on('ended', function () {
    $('.play', $(this).parent()).removeClass('active');
  });
});
