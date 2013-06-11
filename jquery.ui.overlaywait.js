/**
 * jQuery UI OverlayWait
 * 
 * Overlay with wiating progressbar!
 * 
 * Simple usage: $('selector').overlaywait();
 * 
 * <code>
	$(function(){
		$('#lipsum').overlaywait();
	});
 * </code>
 * 
 * The "document ready" is important!
 * The overlaywait() work, if the DOM is loaded!!!
 * 
 * @author Rácz Tibor Zoltán <racztiborzoltan@gmail.com>
 * 
 * History:
 * v0.1
 *  - first release
 *  - Progressbar on Overlay
 */
;(function( $ ) {
	$.widget( 'z.overlaywait', {
		
		options: {
			// for jQuery UI Progressbar plugin
			progressbar:{
				value: false,
				// This config use the jQuery UI OverlayWait plugin
				width: '100%',
			},
			// jQuery UI Position options for progressbar
			// if 'of' value is empty, than default value is the overlay element
			progressbarPosition: {},
		},
		
		_create: function() {
			this._createOverlay();
			this._createProgressbar();
		},
		
		_createOverlay: function()
		{
			if (this.overlay) return;
			
			this.overlay = $('body > .ui-overlaywait');
			if (this.overlay.length !== 1)
				this.overlay = $('<div class="ui-overlaywait">').appendTo('body');
			
			this.overlay
				.addClass('ui-widget-overlay')
				.css({
					position: 'absolute',
					textAlign: 'center',
				})
			;
			
			this.overlay.style = this.element.get(0).style;
			offset = this.element.offset();
			this.overlay.css({
				top: offset.top,
				left: offset.left,
				bottom: this.element.css('bottom'),
				right: this.element.css('right'),
				width: this.element.width(),
				height: this.element.height(),
			});
		},
		
		
		_createProgressbar: function()
		{
			this.progressbar = $('.ui-progressbar', this.overlay);
			if (this.progressbar.length != 1) 
				this.progressbar = $('<div>')
					.progressbar(this.options.progressbar)
					.appendTo(this.overlay);
			
			this.progressbar
				.css('width', this.options.progressbar.width)
			;
			
			if (!this.options.progressbarPosition.of) this.options.progressbarPosition.of = this.overlay;
			this.progressbar.position(this.options.progressbarPosition);
		},
		
		
		open: function()
		{
			this.overlay.show();
			this._create();
		},
		
		
		close: function(){
			this.overlay.hide();
		},
		
		_destroy: function() {
			this.overlay.remove();
		}
	});
	
})( jQuery );