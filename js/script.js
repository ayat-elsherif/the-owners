$(function(){
   
 
      var scrollToUp=$('.scroll-up');
      $(window).scroll(function(){
        ($(this).scrollTop()>=550)?scrollToUp.show():scrollToUp.hide();
        });
      
      scrollToUp.click(function(){
        $('html,body').animate({scrollTop:0},500);
      });

    /**************offcanvas *************/
    $("[data-trigger]").on("click", function(e){
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id =  $(this).attr('data-trigger');
      $(offcanvas_id).toggleClass("showCanvas");
      $('body').toggleClass("offcanvas-active");
      $(".screen-overlay").toggleClass("showCanvas");
  }); 
  
  $(".btn-close, .screen-overlay, #navbarSupportedContent .nav-item").click(function(e){
      $(".screen-overlay").removeClass("showCanvas");
      $(".mobile-offcanvas").removeClass("showCanvas");
      $("body").removeClass("offcanvas-active");
  }); 
  $(window).resize(function(){
      if( $(".screen-overlay").hasClass("showCanvas")){ 
          if($(window).width() > 992){
            $(".mobile-offcanvas").removeClass("showCanvas");
            $("body").removeClass("offcanvas-active");
            $(".screen-overlay").removeClass("showCanvas");
        }
    }
  });
/**************end offcanvas *************/
    $('[data-toggle="tooltip"]').tooltip({
        
        title:"Mon-Fri <br> 8:00AM-6:00PM <br>(GMT +2)",
        html:true
    });
	new WOW().init();
	


/********************************************** */
	$('.form-control:first-child').focus(function(){
		$(this).addClass('round-right');	
	});
	$('.form-control:first-child').on(' blur',function(){
		$(this).removeClass('round-right');	
	});
	

	/*****************switching between advertise ur property/ signUp/ signIn************ */

	$(".modalToggling [data-dismiss=modal]").click(function(){
		// $('body').css('overflow','hidden');
		$('.modal').css('overflow-y','auto');
	});
	/*****************end switching between advertise ur property/ signUp/ signIn************ */

	/***********************add another contact number ******************* */










$('#addContactNo').click(function(){
	toAddNo();
});


newNo = 1;
currentNo = -1;

function toAddNo() {
	var rowNo = newNo;
	if($("#enterContactNo").val()==''){
		alert('من فضلك ادخل رقم الهاتف');
	}
	else if(isNaN($("#enterContactNo").val())){
		alert('ادخل أرقام فقط ');
	}
    else if (currentNo>0) {
		saveEdits();
		
    } else {
        var contactNo = $("#enterContactNo").val();
        var sHtml = `
        <div class='mb-3' id='row${rowNo}'>
			<p class='contactNo mb-0 animated fadeIn' id='phoneNo${rowNo}'><span>${contactNo}</span></p>
			<div class='editingNo'>
				<span class='editRow' onclick='editRow(${rowNo})' > <i class="las la-pen"></i> تعديل </span>&nbsp;
				<span class='deleteRow' onclick='deleteRow(${rowNo})'> <i class="las la-times"></i> حذف</span>
			</div>
		</div>`;
        $("#contactNoList").append(sHtml);
        newNo++;
		$("#enterContactNo").val("");
		$('#contactLabel').html('أضف رقم آخر');

    }
}

	/***********************end add another contact number ******************* */


/******************************Add a property MultiForm***************************** */
    
//jQuery time
var current_fs, next_fs, previous_fs; //.multiForm
var left, opacity, scale; //.multiForm properties which we will animate
var animating; //flag to prevent quick multi-click glitches
let count=1;
$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

		//activate next step on progressbar using the index of next_fs
		count++;
		$(`#progressbar li:nth-child(${count})`).addClass("active");
		console.log($(`#progressbar li:nth-child(${count})`));
		
	if(next_fs.hasClass('hidden')){
		next_fs=next_fs.next(); 

	}else{
		next_fs=next_fs;
	
	}

	//show the next .multiForm
	
	next_fs.show();
	//hide the current .multiForm with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			right = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'right': right, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$(`#progressbar li:nth-child(${count})`).removeClass("active");
	console.log($(`#progressbar li:nth-child(${count})`));
	count--;
	//show the previous .multiForm
	if(previous_fs.hasClass('hidden')){
		previous_fs=previous_fs.prev(); 
	}else{
		previous_fs=previous_fs;
	}
	previous_fs.show(); 
	//hide the current .multiForm with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			right = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'right': right});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
})


let propertyCat=document.getElementById('propertyCat');
let sellPropertyFrom=document.getElementById('sellPropertyFrom');
let rentPropertyFrom=document.getElementById('rentPropertyFrom');
$(propertyCat).change(function(){
	$('.next').click(function(e){
		e.stopPropagation();
			e.preventDefault();
		if(propertyCat.value=="rent"){	
			$(sellPropertyFrom).addClass('hidden').removeClass('showME');
			$(rentPropertyFrom).removeClass('hidden').addClass('showME');
			
		}else if(propertyCat.value=="sell"){
			$(rentPropertyFrom).addClass('hidden').removeClass('showME');
			$(sellPropertyFrom).removeClass('hidden').addClass('showME');
			}
		console.log(propertyCat.value);
	});
});
/***************************End Add a property MultiForm************************** */


});