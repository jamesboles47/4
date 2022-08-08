/*
Copyright (c) 2017 
------------------------------------------------------------------


-------------------------------------------------------------------*/

(function ($) {
	"use strict";
	var Windoors = {
		initialised: false,
		version: 1.0,
		mobile: false,
		init: function () {

			if(!this.initialised) {
				this.initialised = true;
			} else {
				return;
			}

			/*-------------- Windoors Functions Calling ---------------------------------------------------
			------------------------------------------------------------------------------------------------*/
			this.RTL();
			this.Grid_List_view();
			this.Product_Single();
			this.RelatedProductSlider();
			this.DatePicker();
			this.Tooltip();
			this.Switcher();
			this.Custom_Popup();
			this.ContactFormSubmit();
			
		},
		
		/*-------------- Windoors Functions definition ---------------------------------------------------
		---------------------------------------------------------------------------------------------------*/
		RTL: function () {
			// On Right-to-left(RTL) add class 
			var rtl_attr = $("html").attr('dir');
			if(rtl_attr){
				$('html').find('body').addClass("rtl");	
			}		
		},
		Grid_List_view:function(){
			if($('.wd_listgrid_view').length > 0){
				$('.wd_listgrid_view').on('click', 'li', function() {
					$('.wd_listgrid_view ul li.active').removeClass('active');
					$(this).addClass('active');
				});
				$('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
				$('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});
			}
		},
		Product_Single:function(){
			$('.slider-for').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				asNavFor: '.slider-nav'
			});
			$('.slider-nav').slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				asNavFor: '.slider-for',
				dots: false,
				centerMode: false,
				focusOnSelect: true,
				responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1,
						infinite: true
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				}
				]
			});
		},
		RelatedProductSlider:function(){
			$('.wd_related_product_slider').slick({
				dots: false,
				infinite: true,
				autoplay:false,
				speed: 300,
				slidesToShow: 4,
				slidesToScroll: 1,
				responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
				// You can unslick at a given breakpoint now by adding:
				// settings: "unslick"
				// instead of a settings object
				]
			});

		},
		DatePicker: function(){
			$('#datetimepicker10').datetimepicker({
                viewMode: 'years',
                format: 'MM/YYYY'
            });
		},
		Tooltip: function(){
			 $('[data-toggle="tooltip"]').tooltip();
		},
		Switcher: function(){
			$(".wd_menu_close").on("click", function(e) {
				e.preventDefault();
				var div = $(".wd_menudiv");
				if (div.css("left") === "-200px") {
					$(".wd_menudiv").animate({
						left: "0px"
					});
				} else {
					$(".wd_menudiv").animate({
						left: "-200px"
					});
				}
			});
		},
		Custom_Popup: function(){
			if($('.wd_login_popup').length > 0){
				$('.wd_login_popup a').click(function() {
					$('.wd_login').css("opacity", 1);
					$('.wd_login').css("z-index", 2);
				});
				$('.wd_close_btn').click(function() {
					$('.wd_custom_popup').css("opacity", 0);
					$('.wd_custom_popup').css("z-index", -1);
				});
			}
			if($('.wd_signup').length > 0){
				$('.wd_signup').click(function() {
					$('.wd_login').css("opacity", 0);
					$('.wd_login').css("z-index", -1);
					$('.wd_signup_popup').css("opacity", 1);
					$('.wd_signup_popup').css("z-index", 1);
				});
				$('.wd_close_btn').click(function() {
					$('.wd_custom_popup').css("opacity", 0);
					$('.wd_custom_popup').css("z-index", -1);
				});
			}
			if($('.wd_forgot').length > 0){
				$('.wd_forgot').click(function() {
					$('.wd_login').css("opacity", 0);
					$('.wd_login').css("z-index", -1);
					$('.wd_signup_popup').css("opacity", 0);
					$('.wd_signup_popup').css("z-index", -1);
					$('.wd_forgot_popup').css("opacity", 1);
					$('.wd_forgot_popup').css("z-index", 1);
				});
				$('.wd_close_btn').click(function() {
					$('.wd_custom_popup').css("opacity", 0);
					$('.wd_custom_popup').css("z-index", -1);
				});
			}
			if($('.wd_signin').length > 0){
				$('.wd_signin').click(function() {
					$('.wd_signup_popup').css("opacity", 0);
					$('.wd_signup_popup').css("z-index", -1);
					$('.wd_login').css("opacity", 1);
					$('.wd_login').css("z-index", 1);
				});
				$('.wd_close_btn').click(function() {
					$('.wd_custom_popup').css("opacity", 0);
					$('.wd_custom_popup').css("z-index", -1);
				});
			}
			
		},
		//contact form submition
		ContactFormSubmit: function(){
			if($('#send_btn').length > 0){	
				$("#send_btn").on("click", function() {
					var e = $("#ur_name").val();
					var t = $("#ur_mail").val();
					// var ph = $("#ur_phone").val();
					//var s = $("#sub").val();
					var r = $("#msg").val();
					$.ajax({
						type: "POST",
						url: "ajaxmail.php",
						data: {
							username: e,
							useremail: t,
							mesg: r
						},
						success: function(n) {
							var i = n.split("#");
							if (i[0] == "1") {
								$("#ur_name").val("");
								$("#ur_mail").val("");
								$("#msg").val("");
								$("#err").html(i[1]);
							} else {
								$("#ur_name").val(e);
								$("#ur_mail").val(t);
								$("#msg").val(r);
								$("#err").html(i[1]);
							}
						}
					});
				});
			}
		}
	};

	Windoors.init();

	// Load Event
	// Loader js
	$(window).on('load', function() {
		jQuery("#wd_preloader_box").fadeOut();
		jQuery("#wd_preloader_wrapper").delay(350).fadeOut("slow");
		 //window height
		var hei= $(window).height() - 70;
		$(".wd_section_wrapper, .wd_banner_div").css("height", hei);
		$(".wd_about_slider img, .wd_banner_div img").css("height", hei);
	 });

	// Scroll Event
	$(window).on('scroll', function () {
	    
	});
	
	

    $(window).ready(function(e) {
		
    });
	$(document).ready(function(e) {
		$('.wd_menudiv a').click(function() {
			var id=$(this).attr('id');
		$(".wd_section_wrapper").each(function() {
		 $('.wd_section_wrapper').removeClass("active");
		});
		$('#div'+id).addClass("active");	

		});
	});
}(jQuery));
// menu js