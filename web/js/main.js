var pgname = window.location.href.replace('https://','');
var pgname = pgname.split('/');
var isiPad = navigator.userAgent.match(/iPad/i) != null;
var isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);
var mql = window.matchMedia("screen and (max-width: 767px)");
if (mql.matches) {
	var size = 'small';
} else {
	var size = 'large';
}

var antiSpam = function() {
	if (document.getElementById("antiSpam")) {
		a = document.getElementById("antiSpam");
		if (isNaN(a.value) == true) {
			a.value = 0;
		} else {
			a.value = parseInt(a.value) + 1;
		}
	}
	setTimeout("antiSpam()", 1000);
}
 
antiSpam();

if (isIE11 == false) {
	AOS.init({
		easing: 'ease-out',
		duration: 500,
		disable: 'mobile',
		once: true
	});
}

$(document).ready(function(){
	
	if ($(window).width() < 960) {
		var nav1 = $('#nav').html();
		nav1 = nav1.replace(/(<div[^>]*>|<\/div>)/g, "");
		$('#mobMenu').html(nav1);
	
		var menu = new MmenuLight(document.querySelector("#mobMenu"), "all");
	
		var navigator = menu.navigation({
			// selectedClass: 'Selected',
			// slidingSubmenus: true,
			theme: 'dark',
			navbars: true,
			// title: 'Menu'
		});
	
		var drawer = menu.offcanvas({
			position: 'right'
		});
	
		document.querySelector('.hamburger-icon').addEventListener("click", (evnt) => {
			evnt.preventDefault();
			drawer.open();
		});
	}

	$('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
	$('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
	$('.menu > ul > li').on('click', function() {
		$(this).find('ul').slideToggle();
		$(".normal-sub").not($(this).find('ul')).slideUp();
	});

	$('.menu > ul > li.drop > a').on('click', function(e) {
		e.preventDefault();
	});

	$('.burger').on('click', function(e) {
		$(".menu > ul").slideToggle();
		$(".menu-container .social").slideToggle();
		$(this).toggleClass('open');
		e.preventDefault();
	});

	
	$('.menu-nav').html($('.header').html());
	
	$('.toggle-group').find('.toggleme').click(function(e){
	  e.preventDefault();
	  $(this).next().slideToggle();
	  var id = $(this).data('id');
	  if($(this).hasClass('active')) {
	  	$('.toggleme').removeClass('active');
	  } else {
	    $('.toggleme').removeClass('active');
	    $(this).addClass('active');
	  }    
	  $(".toggle-text").not($(this).next()).slideUp();
	  $('[id^=map_canvas]').hide();
	  $('#map_canvas' + id).show();
	});

	if (pgname[1] == 'login') {
		$('#pincode').pincodeInput({
			inputs:4,  
			hideDigits:false,              
			keydown : function(e){},
			complete : function(value, e, errorElement){
				$.ajax({
					type: "POST",
					url: "/check-pin",
					data: 'pin=' + value,
					success: function(data) {
						var pin = data.trim();
						if(pin) {
							window.location.href = '/progress';
						} else {
							$('.incorrect').remove();
							$('#pincode, .form-control').val('');
							$(".form-control:first").focus();
							$('#frmlogin').append('<p class="incorrect">Pin is incorrect, please try again...</p>');
						}
					}
				});
			}
		});
	}

	$(".toggle-password, .toggle-password2").click(function() {
		$(this).toggleClass("switch");
		var input = $($(this).attr("toggle"));
		if (input.attr("type") == "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});

	$('#subscriptions button[data-value]').on('click', function(e) {
		var val = $(this).data('value');
		$("#subscriptions #type").val(val);
	});

	if (size == 'large' && $(window).height() > 960) {
		if (pgname[1] == 'projects' && pgname[2] != '') {
			$(".stickme").sticky({
				topSpacing: 155,
				bottomSpacing: function(){
					var next = $('.footer');
					var bottspace = 100;
					return $('html').height() - next.offset().top + bottspace;
				}
			});
		}
	}

	mediaCheck({
		media: '(max-width: 60em)',
		entry: function() {
		},
		exit: function() {
		}
	});

	var cnt = 0;
	$(".side-image").each(function() {
	  cnt = cnt+1;
	  var bg = $(this).data('bg');
	  $(this).attr('data-id', cnt);
	  $('head').append('<style>[data-id="' + cnt + '"]::before{background-image: url(' + bg + ');}</style>');
	  if ($(this).hasClass('onload')) {
	  	$(this).addClass('fademe');
	  }
	});

	$('#backtotop').on('click', function(e) {
		e.preventDefault();
		window.scrollTo({top: 0, behavior: 'smooth'});
	});

	$('.contact #name').on('keyup change', function() {
        if (this.value.length > 0) {
            $('.gdpr').show();
        } else {
            $('.gdpr').hide();
        }
	}); 

	var swiper2 = new Swiper('.testimonial-swiper', {
		spaceBetween: 30,
		effect: 'fade',
		fadeEffect: { crossFade: true },
		pagination: {
			el: '.swiper-pagination',
		},
	});

	var swiper4 = new Swiper(".mySwiper", {
		spaceBetween: 15,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
        breakpoints: {
          720: {
            slidesPerView: 6,
          },
        },
	});

	var swiper5 = new Swiper(".mySwiper2", {
		spaceBetween: 10,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		thumbs: {
			swiper: swiper4,
		},
	});

	var swiper2 = new Swiper('.project-swiper', {
		effect: 'fade',
		fadeEffect: { crossFade: true },
		speed: 2000,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
	});

	$('#editForm').validate({
		errorPlacement: function(error, element) {
			error.insertAfter('label[for="' + element.attr("id") + '"').addClass('mt-n2');
		}
	});
	
});

// Stickyness 

$(window).scroll(function() {
    var cnt = 0;
    $(".side-image").each(function() {
        cnt = cnt+1;
        var hT = $(this).offset().top;
		if ($(this).hasClass('onload')) {
			if($(window).scrollTop() > hT-700) {
				$('[data-id="' + cnt + '"]').addClass('fademe');
			} else {
				$('[data-id="' + cnt + '"]').removeClass('fademe');
			}
		}
    });
});

if (size == 'small') {
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		if (scroll > 300) {
			$('#backtotop').addClass('active');
		} else {
			$('#backtotop').removeClass('active');
		}
	});
}

if ($(window).width() > 960) {
	var scroll = $(window).scrollTop();
	if (scroll > 200) {
		$('.header').addClass('fixed');
	} else {
		$('.header').removeClass('fixed');
	}
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		if (scroll > 200) {
			$('.header').addClass('fixed');
		} else {
			$('.header').removeClass('fixed');
		}
	});
}