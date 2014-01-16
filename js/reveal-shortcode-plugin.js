(function(){

	/**
	 * Create method
	 */
	tinymce.create('tinymce.plugins.mwhReveal', {

		/**
         * Initializes the plugin, this will be executed after the plugin has been created.
         * This call is done before the editor instance has finished it's initialization so use the onInit event
         * of the editor instance to intercept that event.
         *
         * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
         * @param {string} url Absolute URL to where the plugin is located.
         */
		init : function(ed, url){

			ed.addButton('reveal', {

				title : 'reveal.desc',

				cmd : 'reveal',

				image : url + '/../images/reveal-icon.png'
			});

			ed.addCommand('reveal', function(){

				var selected_text = ed.selection.getContent(),
					id,
					link,
					shortcode;

				/* // Do Not Uncomment
				ed.windowManager.open({
					id : 'wp-link',
					width : 480,
					height : "auto",
					wpDialog : true,
					title : ed.getLang('advlink.link_desc')
				}, {
					plugin_url : url, // Plugin absolute URL
					selected : selected_text
				});
				*/


				//var selected_text = ed.setContent(selected_text, {format : 'raw'});

				if (!selected_text)
					return;

				id = prompt('The ID of this Reveal Modal');

				link = prompt('Do you want link text?');

				if (!id)
					return;

				shortcode = '[reveal id="' + id + '"';

				if (link)
					shortcode += ' link="' + link + '"';

				shortcode += ' ]' + selected_text + '[/reveal]';

				ed.execCommand('mceInsertContent', 0, shortcode);
			});
		},

		/**
         * Creates control instances based in the incoming name. This method is normally not
         * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
         * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
         * method can be used to create those.
         *
         * @param {String} n Name of the control to create.
         * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
         * @return {tinymce.ui.Control} New control instance or null if no control was created.
         */
		createControl : function(n,cm){
			/*if (n == 'mygallery_button') {
                // creates the button
                var button = cm.createButton('reveal', {
                    title : 'reveal.desc', // title of the button
                    image : 'images/reveal-icon.png',  // path to the button's image
                    onclick : function() {
                        // do something when the button is clicked <img src="http://www.garyc40.com/wordpress/wp-includes/images/smilies/icon_smile.gif" alt=":)" class="wp-smiley">





                    }
                });
                return button;
            }*/ // This stuff is for creating a control panel
            return null;
		},

		/**
         * Returns information about the plugin as a name/value array.
         * The current keys are longname, author, authorurl, infourl and version.
         *
         * @return {Object} Name/value array containing information about the plugin.
         */
		getInfo : function(){
			return {
				longname : 'Reveal Modal Box',
				author : 'Matthew Hadwen',
				authorurl : 'http://www.mawaha.com',
				infourl : '',
				version : "1.0"
			}
		}

	});

	// Register plugin
	tinymce.PluginManager.add( 'mwhreveal', tinymce.plugins.mwhReveal );
})();