(function(){
    $("#form-warning").hide();
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
    var mySwiper = new Swiper ('#project-slide', {
        navigation: {
            nextEl: '.collection-button-next',
            prevEl: '.collection-button-prev',
        },
        spaceBetween: 0,
        slidesPerView: 1,
        breakpointsInverse: true,
        breakpoints: {
            1200: {
                slidesPerView: 4,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10
            }
        }
    });

    function checkEmail(data){
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!regex.test(data)) {
            return false;
        }
        return true;
    }

    function required(data){
        if (data == '' || data == null || data == undefined){
            return false;
        }
        return true;
    }

    function clearForm(){
        $("#name").val('');
        $("#email").val('');
        $("#phone").val('');
        $("#content").val('');
    }

    $("#toogleNav").click(function(){
        $("#toogleNav").toggleClass("active");
        $("#sidebar").toggleClass("active")
    });

    $("#send").click(function(){
        $("#form-warning").hide();
        var name = $("#name").val();
        var email = $("#email").val();  
        var phone = $("#phone").val();       
        var message = $("#content").val();
        
        var currentdate = new Date();
        var filltime = currentdate.getFullYear() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getDate() + "  "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

        if( !required(name) || !required(email) || !checkEmail(email)){
            $("#form-warning").show();
            $("#response").text("Please fill out the form correctly.");
            return;
        }

        var data = {
            'name': name,
            'email': email,
            'phone': phone,
            'message': message,
            'filltime': filltime
        }
        $.ajax({
            type: "get",
            url: "https://script.google.com/macros/s/AKfycbx13HNM3uUBQLdObkhIgYrLpXuh0qGMRyYky0z8VQA-rbjpYS4/exec",
            data: data,
            dataType: "JSON",
            success: function (response) {
                $("#form-warning").hide();
                clearForm();
                $("#successModal").modal('show');
            }
        });
    });
    
})();