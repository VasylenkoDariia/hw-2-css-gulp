$(document).ready(function(){
  $('.header__burger').click(function(event){
    $('.header__burger, .navbar__list').toggleClass('active')

  if ($('.navbar__icon').hasClass('fa-bars')) {
    $('.navbar__icon').removeClass('fa-bars');
    $('.navbar__icon').addClass('fa-xmark');
  } else {
    $('.navbar__icon').removeClass('fa-xmark');
    $('.navbar__icon').addClass('fa-bars');
  }
  })
})

