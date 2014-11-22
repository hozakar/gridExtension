(function($) {
	"use strict;"

	var rem = 16;

	$(function() {
		rem = parseInt($('body').css('font-size'));
		$(window).trigger('resize');
	});

	$(window).load(function() {
		$(window).trigger('resize');
		$(window).trigger('scroll');
	});

	$(window).resize(function() {
		/* Scroll point fixer values */
		var spf = {
			topMargin : Math.max(39, Math.ceil(($(window).height() - 120) / (1.5 * rem)) * 1.5) * rem
		}

		$('.header').css('height', spf.topMargin);
		$('.scroll-point-fixer').css('margin-top', spf.topMargin);
		$('figure.manual').css('top', $('section.bsdef').outerHeight() * -1);
		$('figure.off').css('top', ($('section.manual').outerHeight() + $('section.bsdef').outerHeight()) * -1);

		var diff = Math.max(0, $(window).height() - 694);
		diff = Math.ceil(diff / (rem * 1.5)) * rem * 1.5;
		$('.footer').css('margin-top', diff);
	});

	$(window).scroll(function() {
		/* In Page Presentatio Animation */
		if($('body').scrollTop() >= $('.detailed-info').offset().top - $('section.bsdef').outerHeight()) {
			$('.detailed-info figure').addClass('inscr');
		} else {
			$('.detailed-info figure').removeClass('inscr');
		}

		if($('body').scrollTop() >= $('.detailed-info').offset().top) {
			$('.detailed-info figure').addClass('fixed').css('top', 6 * rem);
		} else {
			$('.detailed-info figure').removeClass('fixed');
			$('figure.bsdef').css('top', 0);
			$('figure.manual').css('top', $('section.bsdef').outerHeight() * -1);
			$('figure.off').css('top', ($('section.manual').outerHeight() + $('section.bsdef').outerHeight()) * -1);
		}

		if($('body').scrollTop() >= $('section.manual').offset().top - 7.5 * rem) {
			$('.detailed-info figure.bsdef').addClass('transparent');
		} else {
			$('.detailed-info figure.bsdef').removeClass('transparent');
		}

		if($('body').scrollTop() >= $('section.off').offset().top - 10.5 * rem) {
			$('.detailed-info figure.manual').addClass('transparent');
		} else {
			$('.detailed-info figure.manual').removeClass('transparent');
		}

		if($('body').scrollTop() >= $('.download-btn.btm').offset().top - 21 * rem) {
			$('figure.bsdef, figure.manual, figure.off').removeClass('transparent');
		}

		if($('body').scrollTop() >= $('.download-btn.btm').offset().top - 12 * rem) {
			$('figure.bsdef, figure.manual, figure.off').addClass('transparent');
		}

		/* Social Bar Fixed */
		var fadeTiming = 75;
		if($('body').scrollTop() >= $('.header').height() - $('.social-bar').height()) {
			$('.header').addClass('fixed').css('top', $('.social-bar').height() - $('.header').height());
			$('.scroll-point-fixer').css('opacity', 0);

			if(!$('li.gplus').hasClass('pull-right')) {
				$('li.gplus').fadeOut(fadeTiming, function() {
					$('li.twitter').fadeOut(fadeTiming, function() {
						$('li.face').fadeOut(fadeTiming, function() {
							$('li.gplus, li.twitter, li.face').addClass('pull-right');

							$('.social-bar .bar').fadeIn(4 * fadeTiming, function() {
								$('.social-bar .bar .gbuilder').css('opacity', 1).textflip({
				                    animation: 'rotateY',
				                    interval: 8 * fadeTiming,
				                    sequence: 'linear'
				                });
							});

							$('li.face').fadeIn(fadeTiming, function() {
								$('li.twitter').fadeIn(fadeTiming, function() {
									$('li.gplus').fadeIn(fadeTiming);
								});
							});
						});
					});
				});
			}
		} else {
			$('.header').removeClass('fixed').css('top', 0);
			$('.scroll-point-fixer').css('opacity', 1);

			if($('li.gplus').hasClass('pull-right')) {
				$('.social-bar .bar').fadeOut(3 * fadeTiming, function() {
					$('.social-bar .bar .gbuilder').css('opacity', 0);
				});

				$('li.gplus').fadeOut(fadeTiming, function() {
					$('li.twitter').fadeOut(fadeTiming, function() {
						$('li.face').fadeOut(fadeTiming, function() {
							$('li.gplus, li.twitter, li.face').removeClass('pull-right');
							$('li.face').fadeIn(fadeTiming, function() {
								$('li.twitter').fadeIn(fadeTiming, function() {
									$('li.gplus').fadeIn(fadeTiming);
								});
							});
						});
					});
				});
			}
		}
	});
}(jQuery));