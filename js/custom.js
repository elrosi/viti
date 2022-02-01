// we do not want to actually trigger link, using css focus only
$('.faq-question').click(function(e) {
    e.preventDefault();
});

jQuery( document ).ready( function( $ ) {
	// MagnificPopup / Iframe
	$('.iframe-modal').each(function () {
		$(this).magnificPopup({
			type: 'iframe'
		});
	});

  // popup with form
  $('.popup-with-form').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#name',

    // When elemened is focused, some mobile browsers in some cases zoom in
    // It looks not nice, so we disable it:
    callbacks: {
      beforeOpen: function() {
        if($(window).width() < 700) {
          this.st.focus = false;
        } else {
          this.st.focus = '#name';
        }
      }
    }
  });

  //welcome message
  if ( $('.tripsy_welcome').length ) {
    $(".tripsy_welcome span").on("click", function(){
        $(".tripsy_welcome").remove();
        var expires = (new Date(Date.now() + 86400 * 1000 + 43200)).toUTCString();
        document.cookie = "tripsy_welcome_hide=1; expires=" + (expires) + ";path=/;"
    });
  }

});

function windowClose() {
	window.location.reload();
}
