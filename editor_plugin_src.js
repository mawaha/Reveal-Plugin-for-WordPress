(function(){

	/**
	 * Create object
	 */
	tinymce.create('tinymce.plugins.mwhReveal', {

		/**
         * Initializes the plugin, this will be executed after the plugin has been created.
         * This call is done before the editor instance has finished it's initialization so use the onInit event
         * of the editor instance to intercept that event.
         *
         * @param {tinymce.Editor} editor Editor instance that the plugin is initialized in.
         * @param {string} url Absolute URL to where the plugin is located.
         */
		init : function(editor, url){

			editor.addButton('reveal', {

				title: 'reveal.desc',

				cmd: 'insertReveal', // Reference the command name set in the .addCommand button below

				image: url + '/images/reveal-icon.png',


			});

			editor.addCommand('insertReveal', function(){

				editor.windowManager.open({
					file: url + "/dialog.html",
					width: 350,
					height: 115,
					inline: true,
				}, {
					plugin_url: reveal.plugin_url,
					tinymce_url: reveal.tinymce_url,
					selected_text: editor.selection.getContent()
				});
			});
		},

		/**
         * Returns information about the plugin as a name/value object.
         * The current keys are longname, author, authorurl, infourl and version.
         *
         * @return {Object} Name/value array containing information about the plugin.
         */
		getInfo : function(){
			return {
				longname : 'Reveal Shortcode Plugin',
				author : 'Matthew Hadwen',
				authorurl : 'http://mawaha.com',
				infourl : 'http://twitter.com/ohmawaha',
				version : "1.0"
			}
		}

	});

	// Register plugin
	tinymce.PluginManager.add( 'mwhreveal', tinymce.plugins.mwhReveal );
})();