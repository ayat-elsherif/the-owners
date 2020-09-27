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





/***************************Search cities************************ */

/**************end offcanvas *************/
    $('[data-toggle="tooltip"]').tooltip({
        
        title:"Mon-Fri <br> 8:00AM-6:00PM <br>(GMT +2)",
        html:true
    });
	new WOW().init();
	
/********************************************** */
	let	mainSearchRound='.mainSearch .form-control:first-child';
	// $(mainSearchRound).focus(function(e){
	// 	e.stopPropagation();
	// 	$(this).toggleClass('round-right');	
	// });
	
	$(mainSearchRound).on('change',function(e){
		
		$(this).removeClass('round-right');	
		$(this).blur();
	});
	
	$(mainSearchRound).off().on('click',function(e) {
		// e.stopPropagation();
		$(this).toggleClass('round-right');
		
	  });
	  
	  $(mainSearchRound).on('blur',function(e){
		e.stopPropagation();
		$(this).removeClass('round-right');	
	});

	/*****************switching between advertise ur property/ signUp/ signIn************ */

	$(".modalToggling [data-dismiss=modal]").click(function(){
		// $('body').css('overflow','hidden');
		$('.modal').css('overflow-y','auto');
	});
	/*****************end switching between advertise ur property/ signUp/ signIn************ */

	/***********************add another contact number ******************* */

$('.addContactNoSell').click(function(){
	toAddNo('.enterContactNoSell', '#contactNoList1','Sell');
});

$('.addContactNoRent').click(function(){
	toAddNo('.enterContactNoRent','#contactNoList2','Rent');
});

// $('.addContactNo').click(function(){
// 	toAddNo('.enterContactNo','#contactNoList','edit');
// });

newNo = 1;
currentNo = -1;

function toAddNo(enterContactNo,contactNoList,cat) {
	var rowNo = newNo;
	if($(enterContactNo).val()==''){
		alert('من فضلك ادخل رقم الهاتف');
	}
	else if(isNaN($(enterContactNo).val())){
		alert('ادخل أرقام فقط ');
	}
    else if (currentNo>0) {
		saveEdits(cat);
		
    } else {
        var contactNo = $(enterContactNo).val();
        var sHtml = `
        <div class='mb-3' id='row${rowNo}'>
			<p class='contactNo mb-0 animated fadeIn' id='phoneNo${rowNo}'><span>${contactNo}</span></p>
			<div class='editingNo'>
				<span class='editRow' onclick='editRow(${rowNo}, "${cat}")' > 
					<i class="las la-pen"></i> تعديل </span>&nbsp;
				<span class='deleteRow' onclick='deleteRow(${rowNo}, "${cat}")'> 
					<i class="las la-times"></i> حذف</span>
			</div>
		</div>`;
        $(contactNoList).append(sHtml);
        newNo++;
		$(enterContactNo).val("");
		$('#contactLabel'+cat).html('أضف رقم آخر');

    }
}

	/***********************end add another contact number ******************* */


/******************************Add a property MultiForm***************************** */

var current_fs, next_fs, previous_fs; //.multiForm
var left, opacity, scale; 
var animating; 
let count=1;
$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

		count++;
		$(`#progressbar li:nth-child(${count})`).addClass("active");
		console.log($(`#progressbar li:nth-child(${count})`));
		
	if(next_fs.hasClass('hidden')){
		next_fs=next_fs.next(); 

	}else{
		next_fs=next_fs;
	
	}

	
	next_fs.show();
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			scale = 1 - (1 - now) * 0.2;
			right = (now * 50)+"%";
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
			$('html,body').scrollTop(0);
		}, 
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
			$('html,body').scrollTop(0);
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
			$(sellPropertyFrom).addClass('hidden').removeClass('showME').css({'opacity':'0','right':'50%'});
			$(rentPropertyFrom).removeClass('hidden').addClass('showME').css({'opacity':'1','right':'0%'});
			
		}else if(propertyCat.value=="sell"){
			$(rentPropertyFrom).addClass('hidden').removeClass('showME').css({'opacity':'0','right':'50%'});
			$(sellPropertyFrom).removeClass('hidden').addClass('showME').css({'opacity':'1','right':'0%'});
			}
		console.log(propertyCat.value);
	});
});
/***************************End Add a property MultiForm************************** */


/*****************************videos and document uploading*************************** */

	let propVidbtns=document.querySelectorAll('.propVidBtn');
	let propVidFiles=document.querySelectorAll('.propVidFile');
	let propVidNames=document.querySelectorAll('.propVidName');
	let propDocument=document.getElementById('propDocument');
	let documentList=[];
	let text='';
	let documentNo=1;
	
	$(propVidFiles, propDocument).hide();
	for (let btn of propVidbtns){
		$(btn).click(function(){
			// console.log(btn);
			$(this).next(propVidFiles).click();	
		});
	}
	$(propVidFiles).change(function(){
	
		let fileVal = $(this).val();
		fileVal = fileVal.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
		if(fileVal.length > 10){
		fileVal=fileVal.slice(0,10) +'..';
	}
	
	let myPRogress=$(this).parents('.propVid').find('.propProgress');
	myPRogress.progressBarTimer(
		{
			autostart:true,
			timeLimit:5,
			label : {
                show: true, //show label inside progress bar
                type: 'percent' //type of label. Allowable types: 'percent' => 30% , 'seconds' => 23/60
			},
			onFinish:function() {
				$(myPRogress).hide();
				$(myPRogress).next(propVidNames).addClass('animated fadeIn');
			}
		});
		
		$(this).parents('.propVid').find(propVidNames).text(fileVal);
	});

	$(propDocument).change(function(){
			for(let i=0;i<propDocument.files.length;i++){
				let fileVal = $(this).val();
				fileVal = fileVal.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
				if(fileVal.length > 10){
				fileVal=fileVal.slice(0,10) +'..';
				}
				//making ids for the elements down in text
			text+=`<div id="documentNo${documentNo}"><div class="propProgress" id='progress${documentNo}'></div>
				<p id="document${documentNo}"> ${fileVal} </p>
			</div>`;
			documentList.push(propDocument.files[i]);
			$('.doucmentsGroup').append(text);
			documentNo++;
			text='';
		}
		$(this).parents('.propVid').find('.progressClose').show();
		let myPRogress=$(this).parents('.propVid').find('.propProgress');
		myPRogress.progressBarTimer(
		{
			autostart:true,
			timeLimit: 15,
			label : {
                show: true, //show label inside progress bar
                type: 'percent' //type of label. Allowable types: 'percent' => 30% , 'seconds' => 23/60
			},
			onFinish:function() {
					$(myPRogress).hide();
					$(myPRogress).next('.propVidName').addClass('animated bounce');
			}
		});
		
	});

	/*****************************End videos and document uploading*************************** */

/************************************edit property*********************************** */





let propVideo=document.getElementById('propVideo');

$(propVideo).hide();
$(propVideo).change(function(){
	for(let i=0;i<propVideo.files.length;i++){
		let fileVal = $(this).val();
		fileVal = fileVal.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
		if(fileVal.length > 10){
		fileVal=fileVal.slice(0,10) +'..';
		}
		//making ids for the elements down in text
	text+=`<div id="documentNo${documentNo}"><div class="propProgress" id='progress${documentNo}'></div>
		<p id="document${documentNo}"> ${fileVal} </p>
	</div>`;
	documentList.push(propVideo.files[i]);
	$('.videosGroup').append(text);
	documentNo++;
	text='';
}
$(this).parents('.propVid').find('.progressClose').show();
let myPRogress=$(this).parents('.propVid').find('.propProgress');
myPRogress.progressBarTimer({
	autostart:true,
	timeLimit: 15,
	label : {
		show: true, //show label inside progress bar
		type: 'percent' //type of label. Allowable types: 'percent' => 30% , 'seconds' => 23/60
	},
	onFinish:function() {
			$(myPRogress).hide();
			$(myPRogress).next('.propVidName').addClass('animated bounce');
	}
});

});



/**************************************open social media from android in mobile view**************************************** */
if($(window).width()<767){

  
	const shareButton = document.querySelector('.propertyShare');
	// const shareDialog = document.querySelector('.collapseIHShare');
	// const closeButton = document.querySelector('.close-button');
	
	shareButton.addEventListener('click', event => {
	  if (navigator.share) { 
	   navigator.share({
		  title: 'property title',
		  url: 'https://the-owners.com/url',
		  text:'property details'
		}).then(() => {
		  alert('Thanks for sharing!');
		})
		.catch(console.error);
		shareButton.classList.add('collapsed');
		}
		 else {
		    shareDialog.classList.remove('collapsed');
		}
	});
	
	// closeButton.addEventListener('click', event => {
	//   shareDialog.classList.remove('show');
	// });
	}

});




