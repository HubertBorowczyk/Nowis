/*
 * Created on Sun Feb 12 2017
 *
 * Copyright (c) 2017 Hubert Borowczyk
 */


$(function () {

    //  ------ Page scroll ----------

    $('a[href^="#"]').on('click', function (event) {
        var target = $( this ).attr( 'href' );
        if (target.length) {
            event.preventDefault();        
            $('html, body').animate({
                scrollTop: $(target).offset().top - 50
            }, 600, function(){
                location.hash = target;
            });
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
    var navAnchors = $('.menu').find('a');
    
    navButton.on('click', function () {
        navButton.toggleClass('change');
        if (navigation.css('display') === 'block') {
            navigation.css('display', 'none');
        } else {
            navigation.css('display', 'block');

            navAnchors.on('click', function(){
                navigation.css('display', 'none');
                navButton.removeClass('change');
            });
        }
    });

    // ------------media query - toggle mobile menu display------------

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

    // ------------sticky menu-------------------

    function stickyMenu() {
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

    // ------------form validation--------------

    function formValidation(){
        var form       = $('#form');
        var inputs     = $(form).find(':input').not('button');
        var valid      = true;
        inputs.on('focus', function(){
                if($(this).hasClass('form_error')){
                    $(this).val('').removeClass('form_error');
                    valid = true;
                }

        });
        form.on('submit', function(e){
            e.preventDefault();            
            inputs.each(function(){
                var self = $(this);
                if(self.val() === ''){
                    valid = false;
                    self.parent().addClass('is-active is-completed');
                    self.addClass('form_error').val('Wypełnij pole'); 
                }
            });
            if(valid){
                var newMessage = {
                    'name':    inputs[0].value,
                    'email':   inputs[1].value,
                    'message': inputs[2].value
                }
                $.ajax({
                    type: 'post',
                    url: 'contact.php',
                    data: newMessage
                }).done(function(res){
                    var form_info = $('.form_info');
                    form_info
                        .html('')
                        .removeClass('visible')
                        .html(res);
                    if(res === 'Twoja wiadomość została wysłana <br>'){
                        form_info  
                            .addClass('visible')
                            .css('color', 'green');
                        setTimeout(function(){
                            form_info.removeClass('visible');
                        },3000);

                        inputs.each(function(){
                            var self = $(this);
                            self.val('');
                            self.parent().removeClass("is-completed");
                            self.parent().removeClass("is-active");
                        });
                    }else{
                        form_info
                            .addClass('visible')
                            .css('color', 'red');
                    }
                }).fail(function(err){
                    console.log(err);
                });
            }
        });
    };  
    formValidation();
});
