jQuery(document).ready(function( $ ) {

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Header fixed on scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Real view height for mobile devices
  if (window.matchMedia("(max-width: 767px)").matches) {
    $('#intro').css({ height: $(window).height() });
  }

  // Initiate the wowjs animation library
  new WOW().init();

  // Initialize Venobox
  $('.venobox').venobox({
    bgcolor: '',
    overlayColor: 'rgba(6, 12, 34, 0.85)',
    closeBackground: '',
    closeColor: '#fff'
  });

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center:true,
    responsive: { 0: { items: 1 }, 768: { items: 3 }, 992: { items: 4 }, 1200: {items: 5}
    }
  });

  // Buy tickets select the ticket type on click
  $('#buy-ticket-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var ticketType = button.data('ticket-type');
    var modal = $(this);
    modal.find('#ticket-type').val(ticketType);
  })

// custom code

});
//** button + animation to go to next page **//
$errCount = 0;
$('.nextbutton').click(function () {
  var $btn = $(this),
      $step = $btn.parents('.modal-body'),
      stepIndex = $step.index(),
      $pag = $('.modal-header span').eq(stepIndex);
      $user_type = $('.user_type').val();
      // var arr = jQuery.makeArray($('div').filter('.modal-body').eq(stepIndex).find('input,select'));
      var info = $('div').filter('.modal-body').eq(stepIndex).find('input,select').map(function () { return $(this); }).get();
      info.forEach(checkError);

  function checkError(item)
  {
      $filter = '.' + item.attr('name');
      console.log($filter);
      if ($filter != '.steam[]') {
    if(item.val() == null || item.val() == ''){
      if($('.error').filter($filter).hasClass('is-showing')){} else {
        if ($errCount < info.length){$errCount += 1;}
        $('.error').filter($filter).addClass('is-showing');
       }     
    } else { 
       if($('.error').filter($filter).hasClass('is-showing')){
        $('.error').filter($filter).removeClass('is-showing');
          if ($errCount > 0) {$errCount -= 1;}
        
      }  
   }
  }
  }
      
  if($errCount == 0){    

      
        stepNext($step, $pag);
      
    }  
   
   // if ($errCount > 0) { alert($errCount);  }

   console.log("error Count: ", $errCount);
   console.log(info);
   console.log("info length: ",info.length);
   
      
});


function stepNext($step, $pag) {
  // animate the step out

  $step.addClass('animate-nextout');

  // animate the step in
  setTimeout(function () {
    $step.removeClass('animate-nextout is-showing').next().addClass('animate-nextin');
    $pag.removeClass('is-active').next().addClass('is-active');
  }, 600);

  // after the animation, adjust the classes
  setTimeout(function () {
    $step.next().removeClass('animate-nextin').addClass('is-showing');
  }, 900);
}
//** button + animation to go to next page **//


//** button + animation to go back **//
$('.prevbutton').click(function () {

  var $btn = $(this),
      $step = $btn.parents('.modal-body'),
      stepIndex = $step.index(),
      $pag = $('.modal-header span').eq(stepIndex);
      stepPrev($step,$pag);
         
});

function stepPrev($step, $pag) {
 
// animate the step out
  $step.removeClass('is-showing').prev().addClass('animate-prevout is-showing');

 // animate the step in
  
  setTimeout(function () {
    $step.removeClass('animate-prevout');
    $pag.removeClass('is-active').prev().addClass('is-active');
  }, 600);


  // after the animation, adjust the classes
  setTimeout(function () {
    $step.prev().removeClass('animate-previn').addClass('is-showing');
  }, 900);
}

//** button + animation to go back **//


function step3($step, $pag) {
  // animate the step up
  $step.parents('.modal-wrap').addClass('animate-up');

  setTimeout(function () {
    $('.rerun-button').css('display', 'inline-block');
  }, 300);
}

$('.rerun-button').click(function () {
  $('.modal-wrap').removeClass('animate-up')
                  .find('.modal-body')
                  .first().addClass('is-showing')
                  .siblings().removeClass('is-showing');

  setTimeout(function () {
    $('.rerun-button').css('display', 'none');
    $('.modal-header span:last').removeClass('is-active');
    $('.modal-header span:first').addClass('is-active');
  }, 300);
});

$(function() {
  $('.popupDatepicker').datepick();
  $('.inlineDatepicker').datepick({onSelect: showDate});
});

//** form traverse functions
// function supervisorSchema () {

//  $('div').filter('.modal-body-step-7').insertAfter($('div').filter('.modal-body-step-1'));
//  $('div').filter('.modal-body-step-3').insertAfter($('div').filter('.modal-body-step-7'));
//  $('div').filter('.modal-body-step-9').insertAfter($('div').filter('.modal-body-step-3'));
//  $('div').filter('.modal-body-step-11').insertAfter($('div').filter('.modal-body-step-9'));
//  $('div').filter('.modal-body-step-10').insertAfter($('div').filter('.modal-body-step-11'));
// } 

// function guestSchema () {
//   $('div').filter('.modal-body-step-2').insertAfter($('div').filter('.modal-body-step-1'));
//   $('div').filter('.modal-body-step-3').insertAfter($('div').filter('.modal-body-step-2'));
//   $('div').filter('.modal-body-step-9').insertAfter($('div').filter('.modal-body-step-3'));
//   $('div').filter('.modal-body-step-10').insertAfter($('div').filter('.modal-body-step-9'));

// }

// function studentSchema() {

//   $('div').filter('.modal-body-step-2').insertAfter($('div').filter('.modal-body-step-1'));
//   $('div').filter('.modal-body-step-3').insertAfter($('div').filter('.modal-body-step-2'));
//   $('div').filter('.modal-body-step-4').insertAfter($('div').filter('.modal-body-step-3'));
//   $('div').filter('.modal-body-step-5').insertAfter($('div').filter('.modal-body-step-4'));
//   $('div').filter('.modal-body-step-6').insertAfter($('div').filter('.modal-body-step-5'));
//   $('div').filter('.modal-body-step-7').insertAfter($('div').filter('.modal-body-step-6'));
//   $('div').filter('.modal-body-step-8').insertAfter($('div').filter('.modal-body-step-7'));
//   $('div').filter('.modal-body-step-9').insertAfter($('div').filter('.modal-body-step-8'));    
//   $('div').filter('.modal-body-step-10').insertAfter($('div').filter('.modal-body-step-9'));
// }

// function Partner1 () {
//   $('div').filter('.modal-body-step-2').insertAfter($('div').filter('.modal-body-step-1'));
//   $('div').filter('.modal-body-step-3').insertAfter($('div').filter('.modal-body-step-2'));
//   $('div').filter('.modal-body-step-4').insertAfter($('div').filter('.modal-body-step-3'));
//   $('div').filter('.modal-body-step-5').insertAfter($('div').filter('.modal-body-step-4'));
//   $('div').filter('.modal-body-step-7').insertAfter($('div').filter('.modal-body-step-5'));
//   $('div').filter('.modal-body-step-8').insertAfter($('div').filter('.modal-body-step-7'));
//   $('div').filter('.modal-body-step-9').insertAfter($('div').filter('.modal-body-step-8'));    
//   $('div').filter('.modal-body-step-10').insertAfter($('div').filter('.modal-body-step-9'));
//   $('div').filter('.modal-body-step-6').insertAfter($('div').filter('.modal-body-step-10'));
// }
// function noPartner () {
//   $('div').filter('.modal-body-step-2').insertAfter($('div').filter('.modal-body-step-1'));
//   $('div').filter('.modal-body-step-3').insertAfter($('div').filter('.modal-body-step-2'));
//   $('div').filter('.modal-body-step-4').insertAfter($('div').filter('.modal-body-step-3'));
//   $('div').filter('.modal-body-step-7').insertAfter($('div').filter('.modal-body-step-4'));
//   $('div').filter('.modal-body-step-8').insertAfter($('div').filter('.modal-body-step-7'));
//   $('div').filter('.modal-body-step-9').insertAfter($('div').filter('.modal-body-step-8'));    
//   $('div').filter('.modal-body-step-10').insertAfter($('div').filter('.modal-body-step-9'));
//   $('div').filter('.modal-body-step-5').insertAfter($('div').filter('.modal-body-step-10'));
//   $('div').filter('.modal-body-step-6').insertAfter($('div').filter('.modal-body-step-10'));  
// }

//** form requirement functions 

// function supervisorReq () {
// $('div').filter('.modal-body-step-3,.modal-body-step-7,.modal-body-step-9').find('input,select').attr('required','true');
// $('div').filter('.modal-body-step-2,.modal-body-step-4,.modal-body-step-5,.modal-body-step-6,.modal-body-step-8').find('input,select,checkbox').removeAttr('required');
// }

// function guestReq () {
// $('div').filter('.modal-body-step-2,.modal-body-step-3,.modal-body-step-9').find('input,select').attr('required','true');
// $('div').filter('.modal-body-step-7,.modal-body-step-4,.modal-body-step-5,.modal-body-step-6,modal-body-step-8').find('input,select,checkbox').removeAttr('required');
// }


// function studentReq () {
//   $numpart = $('.numpart').val();
// if ($numpart == '0') {
//   $('div').filter('.modal-body-step-2,.modal-body-step-3,.modal-body-step-4,.modal-body-step-7,.modal-body-step-8,.modal-body-step-9').find('input,select').attr('required','true');
//   $('div').filter('.modal-body-step-5,.modal-body-step-6').find('input,select,checkbox').removeAttr('required');
// }
// else if ($numpart == '1') {
//   $('div').filter('.modal-body-step-2,.modal-body-step-3,.modal-body-step-4,.modal-body-step-5,.modal-body-step-7,.modal-body-step-8,.modal-body-step-9').find('input,select').attr('required','true');
//   $('div').filter('.modal-body-step-6').find('input,select,checkbox').removeAttr('required');
// }
// else if ($numpart == '2')  {
//   $('div').filter('.modal-body').find('input,select').attr('required','true');
//   $('div').filter('.modal-body-step-6,.modal-body-step-11').find('input,select,checkbox').removeAttr('required');
// }

// }



// robotics registration

$('.nxtbutton').click(function () {
  var $btn = $(this),
      $step = $btn.parents('.modal-body-robot'),
      stepIndex = $step.index(),
      $pag = $('.modal-header span').eq(stepIndex);
      $category = $('.rbt_category').val();
      console.log(stepIndex);
      // var arr = jQuery.makeArray($('div').filter('.modal-body').eq(stepIndex).find('input,select'));
      var infoR = $('div').filter('.modal-body-robot').eq(stepIndex).find('input,select').map(function () { return $(this); }).get();
      infoR.forEach(checkError);
  function checkError(item)
  {
      $filter = '.' + item.attr('name');
      console.log($filter);
      if ($filter != '.robot[]') {
        if(item.val() == null || item.val() == ''){
          if($('.error').filter($filter).hasClass('is-showing')){} else {
            if ($errCount < infoR.length){$errCount += 1;}
            $('.error').filter($filter).addClass('is-showing');
           }     
        } else { 
           if($('.error').filter($filter).hasClass('is-showing')){
            $('.error').filter($filter).removeClass('is-showing');
              if ($errCount > 0) {$errCount -= 1;}
            
      }  
   }
  }
}
     
  if($errCount == 0){
      
    if (stepIndex == 2){
      if ($category == 'Kids') {
          kids();
      } else if ($category == 'Junior') {
        junior();
      } else if ($category == 'Senior') {
        senior();
        
      } else if ($category == 'University') {
        university();
      }
      $team = $('.team').val();
      if($team == '0') {
        rbtNoPartner();
        stepNext($step, $pag);        
      } else if($team == '1') {
        rbt1Partner();
        stepNext($step, $pag);
        
      } else if($team == '2') {
        rbt2Partner();
        stepNext($step, $pag);
        
      } else if($team == '3') {
        rbt3Partner();
        stepNext($step, $pag);
      
      } else if($team == '4') {
        rbt4Partner();
        stepNext($step, $pag);
        
      } 


    } else {
      stepNext($step, $pag);
    }
   }
    console.log($team);
    console.log($category);
    console.log($errCount);
    console.log(infoR);
   });

// number of partners robotic
function rbtNoPartner () {
  $('div').filter('.modal-body-robot-step-8').insertAfter($('div').filter('.modal-body-robot-step-3'));
  $('div').filter('.modal-body-robot-step-10').insertAfter($('div').filter('.modal-body-robot-step-8'));
  }
function rbt1Partner () {
  $('div').filter('.modal-body-robot-step-4').insertAfter($('div').filter('.modal-body-robot-step-3'));
  $('div').filter('.modal-body-robot-step-8').insertAfter($('div').filter('.modal-body-robot-step-4'));
  $('div').filter('.modal-body-robot-step-10').insertAfter($('div').filter('.modal-body-robot-step-8'));
  }
function rbt2Partner () {
  $('div').filter('.modal-body-robot-step-4').insertAfter($('div').filter('.modal-body-robot-step-3'));
  $('div').filter('.modal-body-robot-step-5').insertAfter($('div').filter('.modal-body-robot-step-4'));
  $('div').filter('.modal-body-robot-step-8').insertAfter($('div').filter('.modal-body-robot-step-5'));
  $('div').filter('.modal-body-robot-step-10').insertAfter($('div').filter('.modal-body-robot-step-8'));
  }
  function rbt3Partner () {
  $('div').filter('.modal-body-robot-step-4').insertAfter($('div').filter('.modal-body-robot-step-3'));
  $('div').filter('.modal-body-robot-step-5').insertAfter($('div').filter('.modal-body-robot-step-4'));
  $('div').filter('.modal-body-robot-step-6').insertAfter($('div').filter('.modal-body-robot-step-5'));
  $('div').filter('.modal-body-robot-step-8').insertAfter($('div').filter('.modal-body-robot-step-6'));
  $('div').filter('.modal-body-robot-step-10').insertAfter($('div').filter('.modal-body-robot-step-8'));
  }
  function rbt4Partner () {
  $('div').filter('.modal-body-robot-step-4').insertAfter($('div').filter('.modal-body-robot-step-3'));
  $('div').filter('.modal-body-robot-step-5').insertAfter($('div').filter('.modal-body-robot-step-4'));
  $('div').filter('.modal-body-robot-step-6').insertAfter($('div').filter('.modal-body-robot-step-5'));
  $('div').filter('.modal-body-robot-step-7').insertAfter($('div').filter('.modal-body-robot-step-6'));
  $('div').filter('.modal-body-robot-step-8').insertAfter($('div').filter('.modal-body-robot-step-7'));
  $('div').filter('.modal-body-robot-step-10').insertAfter($('div').filter('.modal-body-robot-step-8'));
  }
 
$('.prvbutton').click(function () {
  var $btn = $(this),
      $step = $btn.parents('.modal-body-robot'),
      stepIndex = $step.index(),
      $pag = $('.modal-header span').eq(stepIndex);
      stepPrev($step,$pag);
         
}); 


function kids () {
 
  $('img').filter('.kidz').removeClass('hidden');
  $('input').filter('.kidz').removeAttr('disabled');


  $('img').filter('.sumo').addClass('hidden');
  $('input').filter('.sumo').attr('disabled','true');

  $('img').filter('.ai').addClass('hidden');
  $('input').filter('.ai').attr('disabled','true');
  
  $('img').filter('.maze').addClass('hidden');
  $('input').filter('.maze').attr('disabled','true');
  
  $('img').filter('.line').addClass('hidden');
  $('input').filter('.line').attr('disabled','true');
  
  $('img').filter('.terrain').addClass('hidden');
  $('input').filter('.terrain').attr('disabled','true');
  
  $('img').filter('.vex').addClass('hidden');
  $('input').filter('.vex').attr('disabled','true');
  

}

function junior () {

  $('img').filter('.kidz').removeClass('hidden');
  $('input').filter('.kidz').removeAttr('disabled');


  $('img').filter('.sumo').removeClass('hidden');
  $('input').filter('.sumo').removeAttr('disabled');

  $('img').filter('.ai').addClass('hidden');
  $('input').filter('.ai').attr('disabled','true');
  
  $('img').filter('.maze').removeClass('hidden');
  $('input').filter('.maze').removeAttr('disabled');
  
  $('img').filter('.line').removeClass('hidden');
  $('input').filter('.line').removeAttr('disabled');
  
  $('img').filter('.terrain').addClass('hidden');
  $('input').filter('.terrain').attr('disabled','true');
  
  $('img').filter('.vex').removeClass('hidden');
  $('input').filter('.vex').removeAttr('disabled');
  

}

function senior () {

  $('img').filter('.kidz').addClass('hidden');
  $('input').filter('.kidz').attr('disabled','true');

  $('img').filter('.sumo').removeClass('hidden');
  $('input').filter('.sumo').removeAttr('disabled');

  $('img').filter('.ai').addClass('hidden');
  $('input').filter('.ai').attr('disabled','true');
  
  $('img').filter('.maze').removeClass('hidden');
  $('input').filter('.maze').removeAttr('disabled');
  
  $('img').filter('.line').removeClass('hidden');
  $('input').filter('.line').removeAttr('disabled');
  
  $('img').filter('.terrain').addClass('hidden');
  $('input').filter('.terrain').attr('disabled','true');
  
  $('img').filter('.vex').removeClass('hidden');
  $('input').filter('.vex').removeAttr('disabled');
  

}



function university () {

  $('img').filter('.kidz').addClass('hidden');
  $('input').filter('.kidz').attr('disabled','true');

  $('img').filter('.sumo').removeClass('hidden');
  $('input').filter('.sumo').removeAttr('disabled');

  $('img').filter('.ai').removeClass('hidden');
  $('input').filter('.ai').removeAttr('disabled');
  
  $('img').filter('.maze').removeClass('hidden');
  $('input').filter('.maze').removeAttr('disabled');
  
  $('img').filter('.line').removeClass('hidden');
  $('input').filter('.line').removeAttr('disabled');
  
  $('img').filter('.terrain').removeClass('hidden');
  $('input').filter('.terrain').removeAttr('disabled');
  
  $('img').filter('.vex').removeClass('hidden');
  $('input').filter('.vex').removeAttr('disabled');
  

}

function pwvisibility(){
  var pw = $('#pwvis');
  var pwtype = pw.attr('type');
  if (pwtype === "password") {
    pw.attr('type',"text");
  } else {
    pw.attr('type',"password");
  } 
}


//** disabled code to jump to page , might need later **//




// $('.partbutton').click( function() {
//   var $btn = $(this),
//       $step = $btn.parents('.modal-body'),
//       stepIndex = $step.index(),
//       $pag = $('.modal-header span').eq(stepIndex);
//       var $user_type = $('.user_type').val();

//       if ($user_type == "Supervisor") {
       
//             $('div').filter('.modal-body-step-7').insertAfter($('div').filter('.modal-body-step-1'));
//             stepNext($step,$pag);
//         //     $skip = '.modal-body-step-7';
//         //     $span = 6;
//         // stepto($step,$pag,$skip);
      

//       } else if ($user_type == "Guest") {
//         var $skip = '.modal-body-step-3';
//             $span = 2;
//         stepto($step,$pag,$skip);

//       } else if ($user_type == "Student") {
//         stepNext($step,$pag);

//       }   
      

// });


// function stepto($step, $pag, $skip) {
//   // animate the step out

//   $step.addClass('animate-nextout');

//   // animate the step in
//   setTimeout(function () {
//     $step.removeClass('animate-nextout is-showing');
//     $('div').filter($skip).addClass('animate-nextin');
//     $pag.removeClass('is-active');
//     $('.modal-header span').eq($span).addClass('is-active');

//   }, 600);

//   // after the animation, adjust the classes
//   setTimeout(function () {
//     $('div').filter($skip).removeClass('animate-nextin').addClass('is-showing');
//   }, 900);
// }


    //demo 01 **\\ modal JS code
    // reg modal
  var modal_menu = $(".demo01").animatedModal({
    animatedIn: 'fadeInUp',
    animatedOut: 'fadeOut',
    color: '#00000080',
    beforeOpen: function() {
      var children = $(".thumbJob");
      var index = 0;
      function addClassNextChild() {
        if (index == children.length) return;
        children.eq(index++).show().velocity("transition.expandIn", {
          opacity: 1,
          stagger: 250
        });
        window.setTimeout(addClassNextChild, 200);
      }
      addClassNextChild();
    },
    afterClose: function() {
      $(".thumbJob").hide();
    }
  });
// // robot reg modal
//   var modal_menu = $(".demo02").animatedModal({
//     animatedIn: 'fadeInUp',
//     animatedOut: 'fadeOut',
//     color: '#00000080',
//     beforeOpen: function() {
//       var children = $(".thumbJob");
//       var index = 0;
//       function addClassNextChild() {
//         if (index == children.length) return;
//         children.eq(index++).show().velocity("transition.expandIn", {
//           opacity: 1,
//           stagger: 250
//         });
//         window.setTimeout(addClassNextChild, 200);
//       }
//       addClassNextChild();
//     },
//     afterClose: function() {
//       $(".thumbJob").hide();
//     }
//   });
  // affiliation modal
  var modal_menu = $(".demo03").animatedModal({
    animatedIn: 'fadeInUp',
    animatedOut: 'fadeOut',
    color: '#00000080',
    beforeOpen: function() {
      var children = $(".thumbJob");
      var index = 0;
      function addClassNextChild() {
        if (index == children.length) return;
        children.eq(index++).show().velocity("transition.expandIn", {
          opacity: 1,
          stagger: 250
        });
        window.setTimeout(addClassNextChild, 200);
      }
      addClassNextChild();
    },
    afterClose: function() {
      $(".thumbJob").hide();
    }
  });

  // affiliation err check
  $('.subBtn').click(function () {
  var $btn = $(this),
      $step = $btn.parents('.aff-form'),
      stepIndex = $step.index(),
      $pag = $('.modal-header span').eq(stepIndex);
      // var arr = jQuery.makeArray($('div').filter('.modal-body').eq(stepIndex).find('input,select'));
      var info = $('div').filter('.aff-form').eq(stepIndex).find('input,select').map(function () {return $(this);}).get();
      info.forEach(checkError);

  function checkError(item)
  {
      $filter = '.' + item.attr('name');
      console.log($filter);
    
    if(item.val() == null || item.val() == ''){
      if($('.error').filter($filter).hasClass('is-showing')){} else {
        if ($errCount < info.length){$errCount += 1;}
        $('.error').filter($filter).addClass('is-showing');
       }     
    } else { 
       if($('.error').filter($filter).hasClass('is-showing')){
        $('.error').filter($filter).removeClass('is-showing');
          if ($errCount > 0) {$errCount -= 1;}
        
      }  
   }
  
  }
      
  if($errCount == 0){ 
  $('#aff_form').submit();   
 
   }
   // if ($errCount > 0) { alert($errCount);  }
   console.log("err count " + $errCount);
   console.log(info);
   console.log(info.length);
   
      
});
