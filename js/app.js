/**
 * Created by hubert on 07.01.17.
 */

$(function () {

    //  ------ Page scroll ----------

    $('a[href^="#"]').on('click', function (event) {

        var target = $($(this).attr('href'));

        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 50
            }, 1000);
        }
    });

    // ---------- materialize inputs -----------

    $(".form_input").focus(function () {
        $(this).parent().addClass("is-active is-completed");
    });

    $(".form_input").focusout(function () {
        if ($(this).val() === "")
            $(this).parent().removeClass("is-completed");
        $(this).parent().removeClass("is-active");
    });

    // ------- custom scrollbar in textarea ----------

    $("textarea").niceScroll({
        cursorcolor: "#5293d8"
    });

    // ----------mobile navigation-------------

    var navigation = $('.menu');
    var navButton  = $('.menu-btn');
    

    navButton.on('click', function () {
        console.log(navigation.css('display'));
        navButton.toggleClass('change');
        if (navigation.css('display') == 'block') {
            navigation.css('display', 'none');
        } else {
            navigation.css('display', 'block');
        }
    });

    function test_match_media_with_listener() {
        var mq = window.matchMedia('(min-width:768px)');
        mq.addListener(widthChange);
        widthChange(mq);

        function widthChange(mediaQuery) {
            if (mediaQuery.matches) {
                navButton.css('display', 'none');
                navigation.css('display', 'block');
            } else {
                navigation.css('display', 'none');
                navButton.css('display', 'block');
            }
        }
    }

    test_match_media_with_listener();

    function stickyMenu() {
        // var navElement   = $('nav');
        var menu         = $('nav');
        var menuPosition = menu.offset().top;

        $(window).on('scroll', function () {
            var scroll = $(document).scrollTop();

            if (scroll > menuPosition) {
                menu.addClass('sticky');
            } else {
                menu.removeClass('sticky');
            }
        });
    }   
    
    stickyMenu();
});